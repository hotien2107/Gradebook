// /api/CreateClass
// POST api/CreateClass

import { MongoClient } from "mongodb";

async function handle(req, res) {
  const url = process.env.DB_URL;

  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(url);

    const db = client.db();

    const classCollection = db.collection("myClasses");

    await classCollection.insertOne(JSON.parse(data));

    client.close();

    res.status(201).json({ message: "Class inserted!" });
  }
}

export default handle;
