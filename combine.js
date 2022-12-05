import fs from "fs";

const names = fs.readFileSync("./name_o.txt", "utf-8").split("\n");
const surnames = fs.readFileSync("./surname_o.txt", "utf-8").split("\n");

for (let index = 0; index < 139000; index++) {
  fs.appendFileSync(
    "./seeder.txt",
    `INSERT INTO users(name, surname) VALUES('${names[index]}', '${surnames[index]}');` +
      "\n"
  );
}
