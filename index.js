const express = require("express");
const AWS = require("aws-sdk");

const app = express();
require("dotenv").config();
const port = 10000;

// const s3 = new AWS.S3({
//   region: "ap-south-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

app.get("/", (req, res) => {
  res.send("S3 Server is running.");
});

app.get("/files", async (req, res) => {
  try {
    // const data = await s3
    //   .listObjectsV2({ Bucket: "shubh-bucket-1234" })
    //   .promise();

    // console.log(data);
    // const fileNames = data.Contents.map((obj) => obj.Key);
    res.json({ name: "shubh" });
  } catch (err) {
    console.error("S3 error:", err);
    res.status(500).json({ error: "Failed to list objects" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
