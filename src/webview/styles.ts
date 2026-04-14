/** Global CSS styles for the Tishiki preview webview. Uses VS Code theme variables. */
export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--vscode-editor-background);
    color: var(--vscode-editor-foreground);
    font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, sans-serif);
    font-size: var(--vscode-font-size, 14px);
    line-height: 1.6;
    padding: 0;
  }

  .tishiki-preview {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px 24px;
  }

  .tishiki-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.35));
  }

  .tishiki-header-path {
    font-size: 0.85em;
    color: var(--vscode-descriptionForeground);
  }

  .tishiki-edit-btn {
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 0.85em;
    border-radius: 2px;
  }

  .tishiki-edit-btn:hover {
    background: var(--vscode-button-hoverBackground);
  }

  .tishiki-content h1,
  .tishiki-content h2,
  .tishiki-content h3,
  .tishiki-content h4,
  .tishiki-content h5,
  .tishiki-content h6 {
    margin-top: 1.2em;
    margin-bottom: 0.4em;
    font-weight: 600;
    line-height: 1.3;
  }

  .tishiki-content h1 { font-size: 1.8em; border-bottom: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.35)); padding-bottom: 0.3em; }
  .tishiki-content h2 { font-size: 1.4em; border-bottom: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.2)); padding-bottom: 0.2em; }
  .tishiki-content h3 { font-size: 1.2em; }

  .tishiki-content p {
    margin: 0.8em 0;
  }

  .tishiki-content a {
    color: var(--vscode-textLink-foreground);
    text-decoration: none;
  }

  .tishiki-content a:hover {
    text-decoration: underline;
  }

  .tishiki-content a[data-wiki-link] {
    color: var(--vscode-textLink-foreground);
    border-bottom: 1px dashed var(--vscode-textLink-foreground);
  }

  .tishiki-content code {
    background: var(--vscode-textCodeBlock-background, rgba(128,128,128,0.15));
    padding: 2px 6px;
    border-radius: 3px;
    font-family: var(--vscode-editor-font-family, monospace);
    font-size: 0.9em;
  }

  .tishiki-content pre {
    background: var(--vscode-textCodeBlock-background, rgba(128,128,128,0.15));
    padding: 12px 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1em 0;
  }

  .tishiki-content pre code {
    background: none;
    padding: 0;
    border-radius: 0;
  }

  .tishiki-content ul,
  .tishiki-content ol {
    margin: 0.8em 0;
    padding-left: 2em;
  }

  .tishiki-content li {
    margin: 0.3em 0;
  }

  .tishiki-content blockquote {
    border-left: 3px solid var(--vscode-textBlockQuote-border, rgba(128,128,128,0.5));
    padding: 4px 16px;
    margin: 1em 0;
    color: var(--vscode-textBlockQuote-foreground, inherit);
  }

  .tishiki-content table {
    border-collapse: collapse;
    margin: 1em 0;
    width: 100%;
  }

  .tishiki-content th,
  .tishiki-content td {
    border: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.35));
    padding: 6px 12px;
    text-align: left;
  }

  .tishiki-content th {
    background: var(--vscode-textCodeBlock-background, rgba(128,128,128,0.1));
    font-weight: 600;
  }

  .tishiki-content hr {
    border: none;
    border-top: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.35));
    margin: 1.5em 0;
  }

  .tishiki-content img {
    max-width: 100%;
    height: auto;
  }

  .tishiki-empty {
    text-align: center;
    color: var(--vscode-descriptionForeground);
    padding: 48px 0;
    font-style: italic;
  }
`;
