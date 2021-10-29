import { useState } from "react";
import { TextField, Typography } from "@mui/material";

const FormClass = ({ onClose, onAddClass }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  let nameIsValid = false;
  let imageIsValid = true;
  let formIsValid = false;

  const submitHandle = (e) => {
    e.preventDefault();

    if (name.trim() !== "") nameIsValid = true;
    if (image.trim() !== "" && !isUrlValid(image)) imageIsValid = false;

    if (nameIsValid && imageIsValid) formIsValid = true;

    const classData = {
      name: name,
      teacher: "Nguyen Huy Khanh",
      image: image,
      description: description,
    };

    if (formIsValid) {
      onAddClass(classData);
    }

    //reset
    setName("");
    setImage("");
    setDescription("");

    setIsSubmit(true);
    onClose();
  };

  return (
    <form className="form" onSubmit={submitHandle}>
      <Typography variant="h4">Create your class</Typography>
      <TextField
        fullWidth
        label="Class Name"
        id="fullWidth"
        required
        autoComplete="off"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Image (url)"
        id="fullWidth"
        margin="normal"
        autoComplete="off"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        margin="normal"
        autoComplete="off"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn--primary mr5 mt5">Create</button>
      <button className="btn btn--secondary" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

const isUrlValid = (userInput) => {
  const res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
};

export default FormClass;
