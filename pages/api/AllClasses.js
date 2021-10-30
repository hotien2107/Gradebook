// /api/AllClasses

import { MongoClient } from "mongodb";

async function handle(req, res) {
  const url = process.env.DB_URL;

  const client = await MongoClient.connect(url);

  const db = client.db();

  const meetupCollection = db.collection("myClasses");

  const data = await meetupCollection
    .find({
      $or: [
        { teacher: "Nguyen Huy Khanh" },
        { student: { name: "Nguyen Van A" } },
      ],
    })
    .toArray();

  client.close();

  res.status(200).json(data);
}

export default handle;
