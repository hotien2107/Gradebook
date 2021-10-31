import { ControlPoint } from "@mui/icons-material";
import { Typography } from "@mui/material";
import ErrorPage from "next/error";
import Head from "next/head";
import fetch from "node-fetch";
import React, { Fragment, useState } from "react";
import Classes from "../../components/class/Classes";
import NewClass from "../../components/class/NewClass";


const Teaching = ({ classesData }) => {
  const [openAddClass, setOpenAddClass] = useState(false);

  if (!classesData) {
    return <ErrorPage statusCode={404} />;
  }
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

export async function getStaticProps({ req, res }) {
  const rootApi = process.env.ROOT_API;
  //fetch external api
  try {
    const result = await fetch(`${rootApi}/api/TeachingClasses`);

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
    res.statusCode = 404;
    return {
      props: {},
    };
  }
}

export default Teaching;
