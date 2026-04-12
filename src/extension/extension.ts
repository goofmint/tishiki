import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    return;
  }

  context.subscriptions.push(
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

export function deactivate(): void {
  // cleanup
}
