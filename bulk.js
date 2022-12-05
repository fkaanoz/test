import { Client } from "@elastic/elasticsearch";
import fs from "fs";

const client = new Client({
  node: "http://localhost:9200",
});

let data = [];

const names = fs.readFileSync("./name_o.txt", "utf-8").split("\n");
const surnames = fs.readFileSync("./surname_o.txt", "utf-8").split("\n");

for (let index = 0; index < 139000; index++) {
  data.push({
    id: index + 25,
    name: names[index],
    surname: surnames[index],
  });
}

async function run() {
  const operations = data.flatMap((doc) => [
    { index: { _index: "users" } },
    doc,
  ]);

  const bulkResponse = await client.bulk({ refresh: true, operations });

  if (bulkResponse.errors) {
    const erroredDocuments = [];
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1],
        });
      }
    });
    console.log(erroredDocuments);
  }

  const count = await client.count({ index: "users" });
  console.log(count);
}

run().catch(console.log);
