/**
 * STEP 1: Export tags from Ghost
 * Format of imported tags
 * {"_type: "author", "name": "author-name", "image": "file location", "g_id": "ghost-id"}
 * Export data from sql to json using Dbeaver or equivalent
 * select id, name, profile_image
 * from users u
 * where profile_image is not NULL
 *
 * Import data from json to ndjson
 * sanity dataset import blog-importer/tags.ndjson production --replace
 *
 * STEP 2: Export tags from Sanity
 *
 */

// STEP 1: Export tags from Ghost
// const fs = require("fs-extra")
// const authors = require("./data/authors.json")

// const ndjsonArray = authors.map((author) => ({
//   _type: "author",
//   name: author.name,
//   image: {
//     _type: "image",
//     _sanityAsset: `image@file:///Users/adrianfriend/Desktop/polkadot/${author.profile_image.replace("__GHOST_URL__/content/", "")}`,
//   },
//   g_id: author.id,
// }))

// const ndjsonString = ndjsonArray
//   .map((author) => JSON.stringify(author))
//   .join("\n")

// fs.writeFile("authors.ndjson", ndjsonString, "utf8")
//   .then(() => console.log("file has been written successfully."))
//   .catch((err) => console.error("Error writing file:", err))

// STEP 2: Export tags from Sanity
const fs = require("fs-extra")
const mysql = require("mysql")
const readline = require("readline")

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "G00glePlex!!",
  database: "polkadot_import",
})

const filePath = "data/authors_import.ndjson"
const readStream = fs.createReadStream(filePath)
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
})

rl.on("line", (line) => {
  try {
    const jsonObject = JSON.parse(line)
    const { g_id, _id } = jsonObject
    const query = `UPDATE users SET sanity_id = ? WHERE id = ?`

    connection.query(query, [_id, g_id], (error) => {
      if (error) {
        console.error("Error updating table:", error)
        return
      }
      console.log("Table updated for item:", _id)
    })
  } catch (error) {
    console.error("Error parsing JSON:", error)
  }
})

rl.on("close", () => {
  console.log("Finished reading the file.") // Close the MySQL connection after processing is complete
  connection.end()
})
