import fs from "fs";

const names = fs.readFileSync("./name_o.txt", "utf-8").split("\n");
const surnames = fs.readFileSync("./surname_o.txt", "utf-8").split("\n");

let str = "[";
for (let index = 0; index < 139000; index++) {
  str +=
    `{"name":"${names[index]}", "surname":"${surnames[index]}"}` +
    "\n" +
    `{"index":{}}` +
    "\n";
}

str += "]";

fs.writeFileSync("./mapping-2.json", str);
