import * as path from "node:path";
import * as fs from "node:fs";

const rawArg = process.argv[2];
const docsRoot = rawArg ?? path.resolve(process.cwd(), "docs");

if (!fs.existsSync(docsRoot)) {
  console.error(`tishiki-mcp: docsRoot does not exist: ${docsRoot}`);
  process.exit(1);
}

if (!fs.statSync(docsRoot).isDirectory()) {
  console.error(`tishiki-mcp: docsRoot is not a directory: ${docsRoot}`);
  process.exit(1);
}

console.error(`tishiki-mcp: docsRoot=${docsRoot}`);
console.error("tishiki-mcp: server not yet implemented");
process.exit(1);
