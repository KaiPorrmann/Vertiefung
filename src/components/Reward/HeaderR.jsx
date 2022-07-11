import React from "react";
import { makeStyles } from "tss-react/mui";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Column, Item } from "@mui-treasury/components/flex";

import reward from "../../assets/images/camera.jpg";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
  card: {
    position: "relative",
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#3e61ef",
    minWidth: 800,
    minHeight: 100,
    margin: "0 auto",
  },

  img: {
    position: "absolute",
    width: "15%",
    bottom: 10,
    right: 10,
    display: "block",
  },
  shell: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: "translate(70%, 50%)",
    borderRadius: "50%",
    backgroundColor: "rgba(71, 167, 162, 0.12)",
    padding: "40%",
    "&:before": {
      position: "absolute",
      borderRadius: "50%",
      content: '""',
      display: "block",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: "-16%",
      backgroundColor: "rgba(71, 167, 162, 0.08)",
    },
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Column gap={2} mr={2}>
              <Typography color="white" variant="h3" component="h1">
                Threads{" "}
              </Typography>
              <Typography color="white" variant="h2" component="h2">
                _________{" "}
              </Typography>
              <Typography color="white" variant="h6" component="h3">
              See Recent Articles{" "}
              </Typography>
            </Column>
            <img className={classes.img} alt={"team"} src={reward} />
            <div className={classes.shell} />
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
}
