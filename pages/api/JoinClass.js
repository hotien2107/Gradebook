// /api/JoinClass
// POST api/JoinClass

import { MongoClient, ObjectId } from "mongodb";

async function handle(req, res) {
  const url = process.env.DB_URL;
  const id = req.body;

  if (req.method === "POST") {
    const client = await MongoClient.connect(url);

    const db = client.db();

    const classCollection = db.collection("myClasses");

    const student = { name: "Nguyen Van A" };

    await classCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $push: {
          students: student,
        },
      }
    );

    client.close();

    res.status(201).json({ message: "Student inserted!" });
  }
}

export default handle;
