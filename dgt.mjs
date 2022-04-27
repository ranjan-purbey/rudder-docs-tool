import path, { dirname, join, resolve as _resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { default as remarkFrontmatter } from "remark-frontmatter";
import { default as remarkGfm } from "remark-gfm";
import Webpack from "webpack";

const __dirname = dirname(fileURLToPath(import.meta.url));
const testFilePath = path.resolve(__dirname, "src", "test-sdk.jsx");
const docPath = path.resolve(__dirname, "src", "doc-sdk-node.mdx");
console.log("Test file:", testFilePath);
console.log("Target doc:", docPath);

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const config = {
  mode: "development",
  entry: testFilePath,
  output: {
    path: _resolve("build"),
    clean: true,
    publicPath: "",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "mdx-file": docPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        ],
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: "@mdx-js/loader",
            /** @type {import('@mdx-js/loader').Options} */
            options: {
              remarkPlugins: [remarkFrontmatter, remarkGfm],
            },
          },
        ],
      },
    ],
  },
};

const { webpack } = Webpack;
const compiler = webpack(config);
compiler.run(async (error, result) => {
  if (error) {
    console.error(error);
    return;
  }
  const json = result.toJson();
  console.log(
    await new Promise((resolve, reject) => {
      // import workerExample.js script..

      const worker = new Worker(
        join(json.outputPath, json.assetsByChunkName.main[0]),
        {}
      );
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
      });
    })
  );
});
