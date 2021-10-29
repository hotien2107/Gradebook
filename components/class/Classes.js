import { Grid } from "@mui/material";
import React from "react";
import CardClass from "../card/CardClass";

const Classes = ({ data }) => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      mb={5}
    >
      {data.map((singleClass) => {
        return (
          <Grid key={singleClass.id} item xs={12} sm={6} md={4} lg={3} >
            <CardClass
              title={singleClass.title}
              teacher="Nguyen Huy Khanh"
              image={singleClass.image}
              description={singleClass.description}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Classes;
