// /api/ClassTeaching

import { MongoClient } from "mongodb";

async function handle(req, res) {
  const url = process.env.DB_URL;

  const client = await MongoClient.connect(url);

  const db = client.db();

  const meetupCollection = db.collection("myClasses");

  const data = await meetupCollection
    .find({ teacher: "Nguyen Huy Khanh" })
    .toArray();

  client.close();

  res.json(data);
}

export default handle;
