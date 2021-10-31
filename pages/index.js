import { ControlPoint } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import ErrorPage from "next/error";
import Head from "next/head";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Classes from "../components/class/Classes";
import JoinClass from "../components/class/JoinClass";
import NewClass from "../components/class/NewClass";


export default function Home({ classesTeaching, classesEnrolled }) {
  const router = useRouter();
  const [openAddClass, setOpenAddClass] = useState(false);
  const [openJoinClass, setOpenJoinClass] = useState(false);

  if (!classesTeaching || !classesEnrolled) {
    return <ErrorPage statusCode={404}/>;
  }
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
        <Typography
          variant="h5"
          mt={2}
          mb={2}
          className="title"
          onClick={() => router.push("/classes/Teaching")}
        >
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
        <Typography
          variant="h5"
          mt={2}
          mb={2}
          className="title"
          onClick={() => router.push("/classes/Enrolled")}
        >
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

export async function getStaticProps({req,res}) {
  const rootApi = process.env.ROOT_API;

  //fetch external api
  try {
    const result_teaching = await fetch(
      `${rootApi}/api/TeachingClassesHomePage`
    );

    const data_teaching = await result_teaching.json();

    const result_enrolled = await fetch(
      `${rootApi}/api/EnrolledClassesHomePage`
    );

    const data_enrolled = await result_enrolled.json();

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
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
}
