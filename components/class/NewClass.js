import { useRouter } from "next/router";
import React from "react";
import FormClass from "../form/FormClass";

const NewClass = ({ onClose }) => {
  const router = useRouter();
  const onAddClass = async (classData) => {
    
    //fetch data from API
    try {
      const response = await fetch(`https://gradebook-api.vercel.app/api/CreateClass`, {
        method: "POST",
        body: JSON.stringify(classData),
        header: {
          "Content-Type": "application/json",
        },
      });

      await response.json();

      router.push("/classes/Teaching");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="backdrop">
      <FormClass onClose={onClose} onAddClass={onAddClass} />
    </div>
  );
};

export default NewClass;
