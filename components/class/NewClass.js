import React from "react";
import { useRouter } from "next/router";

import FormClass from "../form/FormClass";

const NewClass = ({ onClose }) => {
  const router = useRouter();

  const onAddClass = async (classData) => {
    //fetch data from API
    const response = await fetch("/api/CreateClass", {
      method: "POST",
      body: JSON.stringify(classData),
      header: {
        "Content-Type": "application/json",
      },
    });

    await response.json();

    router.push("/classes/Teaching");
  };
  return (
    <div className="backdrop">
      <FormClass onClose={onClose} onAddClass={onAddClass} />
    </div>
  );
};

export default NewClass;
