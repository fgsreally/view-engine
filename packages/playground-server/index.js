import express from "express";
import fse from "fs-extra";
import {
  addLocalPkg,
  createChunk,
  buildBundleConfig,
} from "@view-engine/backend";
import { build } from "vite";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/createProject", async (req, res) => {
  let { pkgs, project, type } = req.body;
  let num = 0;
  let localPkgs = [];
  for (let i in pkgs) {
    pkgs[i].forEach((item, i) => {
      let url = item.url;
      if (
        url.startsWith(".") ||
        url.startsWith("/") ||
        url.startsWith("http") ||
        localPkgs.includes(url)
      ) {
      } else {
        localPkgs.push(url);
      }
    });
  }

  if (type === "local") {
    for (let i of localPkgs) {
      let { code } = await addLocalPkg(i);
      if (code !== 0) console.error(`download ${i} fail`);
    }
  }

  let ret = createChunk(pkgs);
  let entryCode = "";
  for (let i in ret) {
    entryCode += `export const a${num++}=import("./${i}")\n`;
    fse.outputFileSync(`./projects/${project}/${i}.js`, ret[i]);
  }
  fse.outputFileSync(`./projects/${project}/entry.js`, entryCode);

  let config = await buildBundleConfig();
  config.build.lib = {
    entry: `./projects/${project}/entry.js`,
    formats: ["es"],
    fileName: () => `entry.js`,
  };
  config.build.outDir = `public/${project}`;

  let r = await build(config);
  console.log(r);
  res.end("1");
});

app.listen(3005, () => {
  console.log("listen");
});
