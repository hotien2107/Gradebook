import { ControlPoint } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import { MongoClient } from "mongodb";

import Classes from "../../components/class/Classes";
import NewClass from "../../components/class/NewClass";

const Teaching = ({ classesData }) => {
  const [openAddClass, setOpenAddClass] = useState(false);
  return (
    <Fragment>
      <Head>
        <title>Gradebook-Teaching</title>
        <meta
          name="description"
          content="Website to support learning and teaching"
        />
      </Head>

      <div className="group-title">
        <Typography variant="h5" mt={2} mb={2} className="title">
          Teaching
        </Typography>
        <ControlPoint
          className="icon icon--add"
          onClick={() => setOpenAddClass(true)}
        />
      </div>
      {openAddClass ? <NewClass onClose={() => setOpenAddClass(false)} /> : ""}
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
    .find({ teacher: "Nguyen Huy Khanh" })
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

export default Teaching;
