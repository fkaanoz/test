import fs from "fs";

const json = JSON.parse(fs.readFileSync("./names.json", "utf-8"));

let counter = 1;
let names = [];

for (const key in json) {
  fs.appendFileSync("./name_o.txt", `${key}` + "\n");

  counter++;
}
