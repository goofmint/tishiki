import * as vscode from "vscode";
import * as path from "node:path";
import { PreviewManager } from "./preview";

/** Stub tree data provider for the wiki page tree. Returns an empty tree. */
class WikiTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  /** Returns the tree item as-is. */
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  /** Returns an empty list. Will be replaced with actual page listing. */
  getChildren(): vscode.TreeItem[] {
    return [];
  }
}

/** Activates the Tishiki extension. Registers commands and sets up the wiki tree view. */
export function activate(context: vscode.ExtensionContext): void {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    return;
  }

  const docsRoot = path.join(workspaceFolder.uri.fsPath, "docs");
  const treeProvider = new WikiTreeProvider();
  const previewManager = new PreviewManager(context, docsRoot);

  context.subscriptions.push(
    vscode.window.createTreeView("tishiki.wikiTree", {
      treeDataProvider: treeProvider,
    }),
    vscode.commands.registerCommand("tishiki.openPage", () => {
      vscode.window.showInformationMessage("Tishiki: openPage (not implemented)");
    }),
    vscode.commands.registerCommand("tishiki.newPage", () => {
      vscode.window.showInformationMessage("Tishiki: newPage (not implemented)");
    }),
    vscode.commands.registerCommand("tishiki.deletePage", () => {
      vscode.window.showInformationMessage("Tishiki: deletePage (not implemented)");
    }),
    vscode.commands.registerCommand(
      "tishiki.previewPage",
      (fileUri?: vscode.Uri) => previewManager.openPreview(fileUri),
    ),
    vscode.commands.registerCommand("tishiki.refreshTree", () => {
      vscode.window.showInformationMessage("Tishiki: refreshTree (not implemented)");
    }),
    // Auto-preview when switching to a docs/ markdown file
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (!editor) {
        return;
      }
      if (isUnderDocsRoot(editor.document.uri.fsPath, docsRoot)) {
        vscode.commands.executeCommand("tishiki.previewPage", editor.document.uri);
      }
    }),
    // Re-send content on file save
    vscode.workspace.onDidSaveTextDocument(async (doc) => {
      if (isUnderDocsRoot(doc.uri.fsPath, docsRoot)) {
        try {
          await previewManager.updateIfActive(doc.uri);
        } catch (err) {
          console.error("tishiki: updateIfActive failed", err);
        }
      }
    }),
    previewManager,
  );

  // Preview the currently active editor if it's already a docs/ markdown file
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor && isUnderDocsRoot(activeEditor.document.uri.fsPath, docsRoot)) {
    vscode.commands.executeCommand("tishiki.previewPage", activeEditor.document.uri);
  }
}

function isUnderDocsRoot(fsPath: string, docsRoot: string): boolean {
  if (!fsPath.endsWith(".md")) {
    return false;
  }
  const resolvedRoot = path.resolve(docsRoot);
  const resolvedPath = path.resolve(fsPath);
  const caseInsensitive = process.platform === "win32" || process.platform === "darwin";
  const a = caseInsensitive ? resolvedRoot.toLowerCase() : resolvedRoot;
  const b = caseInsensitive ? resolvedPath.toLowerCase() : resolvedPath;
  const rel = path.relative(a, b);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

/** Deactivates the Tishiki extension. */
export function deactivate(): void {
  // cleanup
}
