import { Fragment, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";
import { ControlPoint } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";

import Classes from "../components/class/Classes";
import NewClass from "../components/class/NewClass";
import JoinClass from "../components/class/JoinClass";

export default function Home({ classesTeaching, classesEnrolled }) {
  const router = useRouter();
  const [openAddClass, setOpenAddClass] = useState(false);
  const [openJoinClass, setOpenJoinClass] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>Gradebook-Home</title>
        <meta
          name="description"
          content="Website to support learning and teaching"
        />
      </Head>

      <div className="group-title">
        <Typography variant="h5" mt={2} mb={2} className="title" onClick={() => router.push('/classes/Teaching')}>
          Teaching
        </Typography>
        <ControlPoint
          className="icon icon--add"
          onClick={() => setOpenAddClass(true)}
        />
      </div>
      {openAddClass ? <NewClass onClose={() => setOpenAddClass(false)} /> : ""}
      <Classes data={classesTeaching} />

      <Divider />

      <div className="group-title">
        <Typography variant="h5" mt={2} mb={2} className="title" onClick={() => router.push('/classes/Enrolled')}>
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
      <Classes data={classesEnrolled} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const url = process.env.DB_URL;

  const client = await MongoClient.connect(url);

  const db = client.db();

  const meetupCollection = db.collection("myClasses");

  const data_teaching = await meetupCollection
    .find({ teacher: "Nguyen Huy Khanh" })
    .limit(4)
    .toArray();

  const data_enrolled = await meetupCollection
    .find({ students: { name: "Nguyen Van A" } })
    .limit(4)
    .toArray();

  client.close();

  const dataTeachingFormated = data_teaching.map((item) => ({
    id: item._id.toString(),
    title: item.name,
    image: item.image,
    description: item.description,
  }));

  const dataEnrolledFormated = data_enrolled.map((item) => ({
    id: item._id.toString(),
    title: item.name,
    image: item.image,
    description: item.description,
  }));

  return {
    props: {
      classesTeaching: dataTeachingFormated,
      classesEnrolled: dataEnrolledFormated,
    },
    revalidate: 1,
  };
}
