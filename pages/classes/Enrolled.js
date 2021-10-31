import { ControlPoint } from "@mui/icons-material";
import { Typography } from "@mui/material";
import ErrorPage from "next/error";
import Head from "next/head";
import fetch from "node-fetch";
import React, { Fragment, useState } from "react";
import Classes from "../../components/class/Classes";
import JoinClass from "../../components/class/JoinClass";


const Enrolled = ({ classesData }) => {
  const [openJoinClass, setOpenJoinClass] = useState(false);

  if (!classesData) {
    return <ErrorPage statusCode={404}/>;
  }

  return (
    <Fragment>
      <Head>
        <title>Gradebook-Enrolled</title>
        <meta
          name="description"
          content="Website to support learning and teaching"
        />
      </Head>
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

export async function getStaticProps({ req, res }) {
  const rootApi = process.env.ROOT_API;
  // fetch external api
  try {
    const result = await fetch(`${rootApi}/api/EnrolledClasses`);

    const data = await result.json();

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
  } catch {
    console.log(error);
    return {
      props: {},
    };
  }
}

export default Enrolled;
