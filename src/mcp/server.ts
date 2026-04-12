import * as path from "node:path";

const docsRoot = process.argv[2] ?? path.resolve(process.cwd(), "docs");

console.error(`tishiki-mcp: docsRoot=${docsRoot}`);
console.error("tishiki-mcp: server not yet implemented");
process.exit(0);
