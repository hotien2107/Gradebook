import { ControlPoint } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import Classes from "../../components/class/Classes";
import NewClass from "../../components/class/NewClass";

const Teaching = ({ classesData }) => {
  const [openAddClass, setOpenAddClass] = useState(false);
  return (
    <Fragment>
      <Head>
        <title>Class</title>
        <meta name="description" content="Generated by create next app" />
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

export async function getServerSideProps() {
  //fetch data from api
  const url = process.env.ROOT_URL
    ? process.env.ROOT_URL
    : "http://localhost:3000";
  const response = await fetch(`${url}/api/ClassesTeaching`);

  const data = await response.json();

  const dataFormated = data.map((item) => ({
    id: item._id.toString(),
    title: item.name,
    image: item.image,
    description: item.description,
  }));

  return {
    props: {
      classesData: dataFormated,
    }
  };
}

export default Teaching;
