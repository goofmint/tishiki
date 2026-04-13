import { createRoot } from "react-dom/client";
import { useState, useEffect, useCallback, useRef } from "react";
import { renderMarkdown } from "./markdown";
import { globalStyles } from "./styles";

const vscodeApi = acquireVsCodeApi();

interface ContentMessage {
  type: "content";
  markdown: string;
  filePath: string;
}

/** Root application component for the Tishiki preview webview. */
function App() {
  const [html, setHtml] = useState("");
  const [filePath, setFilePath] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MessageEvent<ContentMessage>) => {
      const msg = event.data;
      if (msg.type === "content") {
        setHtml(renderMarkdown(msg.markdown));
        setFilePath(msg.filePath);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleEdit = useCallback(() => {
    vscodeApi.postMessage({ type: "edit", filePath });
  }, [filePath]);

  const handleContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target;
      if (!(target instanceof HTMLAnchorElement)) {
        return;
      }

      e.preventDefault();

      const wikiLink = target.getAttribute("data-wiki-link");
      if (wikiLink) {
        vscodeApi.postMessage({ type: "navigate", targetPath: wikiLink });
        return;
      }

      const href = target.getAttribute("href");
      if (!href) {
        return;
      }

      if (href.startsWith("http://") || href.startsWith("https://")) {
        vscodeApi.postMessage({ type: "openExternal", url: href });
        return;
      }

      // Relative link — treat as internal navigation
      const resolved = href.replace(/\.md$/, "");
      vscodeApi.postMessage({ type: "navigate", targetPath: resolved });
    },
    [],
  );

  if (!html) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="tishiki-preview">
          <div className="tishiki-empty">Open a markdown file in docs/ to preview</div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div className="tishiki-preview">
        <div className="tishiki-header">
          <span className="tishiki-header-path">{filePath}</span>
          <button className="tishiki-edit-btn" onClick={handleEdit}>
            Edit
          </button>
        </div>
        <div
          className="tishiki-content"
          ref={contentRef}
          onClick={handleContentClick}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
