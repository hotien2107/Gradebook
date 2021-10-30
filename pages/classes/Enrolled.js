import { ControlPoint } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { MongoClient } from "mongodb";

import Classes from "../../components/class/Classes";
import JoinClass from "../../components/class/JoinClass";

const Enrolled = ({ classesData }) => {
  const [openJoinClass, setOpenJoinClass] = useState(false);

  return (
    <Fragment>
      <div className="group-title">
        <Typography variant="h5" mt={2} mb={2} className="title">
          Enrolled
        </Typography>
        <ControlPoint
          className="icon icon--add"
          onClick={() => setOpenJoinClass(true)}
        />
      </div>
      {openJoinClass ? (
        <JoinClass onClose={() => setOpenJoinClass(false)} />
      ) : (
        ""
      )}
      <Classes data={classesData} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const url = process.env.DB_URL;

  const client = await MongoClient.connect(url);

  const db = client.db();

  const meetupCollection = db.collection("myClasses");

  const data = await meetupCollection
    .find({ students: { name: "Nguyen Van A" } })
    .toArray();

  client.close();

  const dataFormated = data.map((item) => ({
    id: item._id.toString(),
    title: item.name,
    image: item.image,
    description: item.description,
  }));

  return {
    props: {
      classesData: dataFormated,
    },
    revalidate: 1,
  };
}

export default Enrolled;
