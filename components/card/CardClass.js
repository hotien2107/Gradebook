import React from "react";
import { MoreVert } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

const CardClass = ({ title, teacher, image, description }) => {
  return (
    <Card sx={{ maxWidth: 345, height: 400 }} className="card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="class">
            {title[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={title}
        subheader={teacher}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          image
            ? image
            : "https://cdn.pixabay.com/photo/2020/01/03/01/18/welcome-4737158_960_720.jpg"
        }
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" >
          {description.length > 150 ? description.slice(0, 150) + '...' : description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardClass;
