import * as vscode from "vscode";

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

  const treeProvider = new WikiTreeProvider();

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
    vscode.commands.registerCommand("tishiki.previewPage", () => {
      vscode.window.showInformationMessage("Tishiki: previewPage (not implemented)");
    }),
    vscode.commands.registerCommand("tishiki.refreshTree", () => {
      vscode.window.showInformationMessage("Tishiki: refreshTree (not implemented)");
    }),
  );
}

/** Deactivates the Tishiki extension. */
export function deactivate(): void {
  // cleanup
}
