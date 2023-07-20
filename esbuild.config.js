import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    logLevel: "info",
    entryPoints: [
      "src/popup.ts",
      "src/content-scripts.ts",
      "src/background.ts",
      "src/realtime-card.ts",
    ],
    bundle: true,
    outdir: "dist",
  },
  { root: "dist" }
);
