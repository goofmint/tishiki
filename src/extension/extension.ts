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
      const fsPath = editor.document.uri.fsPath;
      if (fsPath.startsWith(docsRoot) && fsPath.endsWith(".md")) {
        vscode.commands.executeCommand("tishiki.previewPage", editor.document.uri);
      }
    }),
    // Re-send content on file save
    vscode.workspace.onDidSaveTextDocument((doc) => {
      if (doc.uri.fsPath.startsWith(docsRoot) && doc.uri.fsPath.endsWith(".md")) {
        previewManager.updateIfActive(doc.uri);
      }
    }),
    previewManager,
  );

  // Preview the currently active editor if it's already a docs/ markdown file
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const fsPath = activeEditor.document.uri.fsPath;
    if (fsPath.startsWith(docsRoot) && fsPath.endsWith(".md")) {
      vscode.commands.executeCommand("tishiki.previewPage", activeEditor.document.uri);
    }
  }
}

/** Deactivates the Tishiki extension. */
export function deactivate(): void {
  // cleanup
}
