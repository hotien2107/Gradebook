import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Typography } from "@mui/material";

const JoinClass = ({ onClose }) => {
  const [enteredId, setEnteredId] = useState("");
  const router = useRouter();

  const onJoinClass = async (e) => {
    e.preventDefault();

    if (enteredId.trim() !== "") {
      //fetch data from API
      const response = await fetch(`https://gradebook-api.vercel.appapi/JoinClass`, {
        method: "POST",
        body: enteredId,
        header: {
          "Content-Type": "application/json",
        },
      });
      await response.json();

      setEnteredId('');
      router.push("/classes/Enrolled");
      onClose();
    }
  };
  return (
    <div className="backdrop" onSubmit={onJoinClass}>
      <form className="form">
        <Typography variant="h4">Join a class</Typography>
        <TextField
          fullWidth
          label="Class Id"
          id="fullWidth"
          required
          autoComplete="off"
          margin="normal"
          value={enteredId}
          onChange={(e) => setEnteredId(e.target.value)}
        />
        <button className="btn btn--primary mr5 mt5">Join</button>
        <button className="btn btn--secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default JoinClass;
