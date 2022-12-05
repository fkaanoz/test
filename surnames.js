import fs from "fs";

const surnames = fs.readFileSync("./surnames.txt", "utf-8");

const s = surnames.split(" ").map((s) => {
  return s.slice(s.indexOf("\r\n") + 2, s.length);
});

s.forEach((e) => {
  fs.appendFileSync("./surname_o.txt", e + "\n");
});
