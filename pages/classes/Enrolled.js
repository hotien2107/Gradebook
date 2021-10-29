import { ControlPoint } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
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

export async function getServerSideProps() {
  //fetch data from api
  const url = process.env.ROOT_URL
    ? process.env.ROOT_URL
    : "http://localhost:3000";
  const response = await fetch(`${url}/api/ClassesEnrolled`);

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

export default Enrolled;
