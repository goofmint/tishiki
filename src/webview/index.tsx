import { createRoot } from "react-dom/client";

function App() {
  return <div>Tishiki Wiki Preview</div>;
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
