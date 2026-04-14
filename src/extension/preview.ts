import * as vscode from "vscode";
import * as path from "node:path";

/** Manages the Tishiki preview WebviewPanel lifecycle and content updates. */
export class PreviewManager implements vscode.Disposable {
  private panel: vscode.WebviewPanel | undefined;
  private currentFileUri: vscode.Uri | undefined;
  private readonly extensionUri: vscode.Uri;
  private readonly docsRoot: string;
  private webviewReady = false;
  private pendingContent: { markdown: string; filePath: string } | undefined;

  constructor(context: vscode.ExtensionContext, docsRoot: string) {
    this.extensionUri = context.extensionUri;
    this.docsRoot = docsRoot;
  }

  /** Opens a preview panel for the given file, or the active editor's file. */
  async openPreview(fileUri?: vscode.Uri): Promise<void> {
    const uri = fileUri ?? vscode.window.activeTextEditor?.document.uri;
    if (!uri || !uri.fsPath.endsWith(".md")) {
      return;
    }

    const relativePath = path.relative(this.docsRoot, uri.fsPath);
    const title = path.basename(uri.fsPath, ".md");

    // Ensure the markdown editor lives in column One so it can't displace
    // the preview panel in column Two when opened from the file tree.
    // We can't just call showTextDocument(col One) — that would open a
    // duplicate and leave the original tab in the wrong column. Instead
    // locate the tab, close it, and reopen in column One.
    const misplacedTab = vscode.window.tabGroups.all
      .flatMap((g) => g.tabs)
      .find(
        (t) =>
          t.input instanceof vscode.TabInputText &&
          t.input.uri.fsPath === uri.fsPath &&
          t.group.viewColumn !== vscode.ViewColumn.One,
      );
    if (misplacedTab) {
      await vscode.window.tabGroups.close(misplacedTab);
      await vscode.window.showTextDocument(uri, {
        viewColumn: vscode.ViewColumn.One,
        preserveFocus: false,
      });
    }

    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Two, true);
      this.panel.title = `Preview: ${title}`;
    } else {
      this.panel = vscode.window.createWebviewPanel(
        "tishiki.preview",
        `Preview: ${title}`,
        { viewColumn: vscode.ViewColumn.Two, preserveFocus: true },
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.joinPath(this.extensionUri, "dist", "webview"),
          ],
        },
      );
      this.webviewReady = false;
      this.pendingContent = undefined;
      this.panel.webview.html = this.getHtml(this.panel.webview);
      this.panel.webview.onDidReceiveMessage((msg) => this.handleMessage(msg));
      this.panel.onDidDispose(() => {
        this.panel = undefined;
        this.currentFileUri = undefined;
        this.webviewReady = false;
        this.pendingContent = undefined;
      });
    }

    this.currentFileUri = uri;
    await this.sendContent(uri, relativePath);
  }

  /** Resends content to the webview if the saved file matches the currently previewed file. */
  async updateIfActive(fileUri: vscode.Uri): Promise<void> {
    if (!this.panel || !this.currentFileUri) {
      return;
    }
    if (fileUri.fsPath === this.currentFileUri.fsPath) {
      const relativePath = path.relative(this.docsRoot, fileUri.fsPath);
      await this.sendContent(fileUri, relativePath);
    }
  }

  /** Disposes the panel if it exists. */
  dispose(): void {
    this.panel?.dispose();
  }

  private async sendContent(uri: vscode.Uri, relativePath: string): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(uri);
    const markdown = new TextDecoder().decode(bytes);
    if (!this.webviewReady) {
      // Webview hasn't mounted yet; queue the latest content for the
      // ready handshake to flush. Overwrites any older pending content.
      this.pendingContent = { markdown, filePath: relativePath };
      return;
    }
    await this.panel?.webview.postMessage({
      type: "content",
      markdown,
      filePath: relativePath,
    });
  }

  private handleMessage(msg: { type: string; filePath?: string; targetPath?: string; url?: string }): void {
    switch (msg.type) {
      case "ready":
        this.webviewReady = true;
        if (this.pendingContent) {
          const { markdown, filePath } = this.pendingContent;
          this.pendingContent = undefined;
          this.panel?.webview.postMessage({ type: "content", markdown, filePath });
        }
        break;
      case "edit":
        void this.openFileInEditor(msg.filePath);
        break;
      case "navigate":
        void this.navigateToPage(msg.targetPath);
        break;
      case "openExternal":
        if (msg.url) {
          vscode.env.openExternal(vscode.Uri.parse(msg.url));
        }
        break;
    }
  }

  private async openFileInEditor(filePath?: string): Promise<void> {
    if (!filePath) {
      return;
    }
    const absPath = path.join(this.docsRoot, filePath);
    const uri = vscode.Uri.file(absPath);
    await this.openUriInEditor(uri);
  }

  private async navigateToPage(targetPath?: string): Promise<void> {
    if (!targetPath) {
      return;
    }
    const mdPath = targetPath.endsWith(".md") ? targetPath : `${targetPath}.md`;
    const absPath = path.join(this.docsRoot, mdPath);
    const uri = vscode.Uri.file(absPath);

    try {
      await vscode.workspace.fs.stat(uri);
      await this.openPreview(uri);
      await this.openUriInEditor(uri);
    } catch {
      // Try index.md fallback
      const indexPath = path.join(
        this.docsRoot,
        targetPath.replace(/\.md$/, ""),
        "index.md",
      );
      const indexUri = vscode.Uri.file(indexPath);
      try {
        await vscode.workspace.fs.stat(indexUri);
        await this.openPreview(indexUri);
        await this.openUriInEditor(indexUri);
      } catch {
        vscode.window.showWarningMessage(`Page not found: ${targetPath}`);
      }
    }
  }

  private async openUriInEditor(uri: vscode.Uri): Promise<void> {
    await vscode.window.showTextDocument(uri, {
      viewColumn: vscode.ViewColumn.One,
      preserveFocus: false,
    });
  }

  private getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "dist", "webview", "webview.js"),
    );
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline';">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tishiki Preview</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
}

/** Generates a random nonce for CSP. */
function getNonce(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < 32; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}
