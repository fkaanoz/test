import fs from "fs";

const t = fs
  .readFileSync("./mapping.txt", "utf-8")
  .replace(",\n", `\n{"index":{"_index": "users"}}\n`);

fs.writeFileSync("./mapping-2.txt", t);
