import React from "react";
import { makeStyles } from "tss-react/mui";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Column, Item } from "@mui-treasury/components/flex";

import feedback from "../../assets/images/feedback.png";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";


const useStyles = makeStyles()((theme) => ({
  card: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#3e61ef",
    minWidth: 400,
    minHeight: 180,
    margin: "0 auto",
  },

  img: {
    width: "25%",
    bottom: 0,
    left: 20,
    display: "block",
    margin: "0 auto",
  },
}));

export default function Header() {
  const { classes } = useStyles();

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card className={classes.card}>
        <Grid container>
            <Column gap={2} mr={2}>
              <Typography color="white" variant="h3" component="h1" align="center">
                Feedback{" "}
              </Typography>
              <img className={classes.img} src={feedback} />
            </Column>
        </Grid>
      </Card>
    </Grid>
  );
}
