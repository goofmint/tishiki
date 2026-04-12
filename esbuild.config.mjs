import * as esbuild from "esbuild";

const isWatch = process.argv.includes("--watch");

/** @type {esbuild.BuildOptions} */
const shared = {
  bundle: true,
  sourcemap: true,
  logLevel: "info",
  target: "node18",
};

/** @type {esbuild.BuildOptions[]} */
const configs = [
  {
    ...shared,
    entryPoints: ["src/extension/extension.ts"],
    outfile: "dist/extension/extension.js",
    format: "cjs",
    platform: "node",
    external: ["vscode"],
  },
  {
    ...shared,
    entryPoints: ["src/mcp/server.ts"],
    outfile: "dist/mcp/server.js",
    format: "cjs",
    platform: "node",
    banner: { js: "#!/usr/bin/env node" },
  },
  {
    ...shared,
    entryPoints: ["src/webview/index.tsx"],
    outfile: "dist/webview/webview.js",
    format: "iife",
    platform: "browser",
    target: "es2020",
    sourcemap: false,
    jsx: "automatic",
  },
];

if (isWatch) {
  const contexts = await Promise.all(configs.map((c) => esbuild.context(c)));
  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log("Watching for changes...");
} else {
  await Promise.all(configs.map((c) => esbuild.build(c)));
}
