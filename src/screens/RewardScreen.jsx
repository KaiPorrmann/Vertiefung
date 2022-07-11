import React from "react";
import Angebote from "../components/RewardScreenCompo/Angebote";
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";
import Header from "../components/Reward/HeaderR";

const useStyles = makeStyles()((theme) => ({
  container: {
    margin: theme.spacing(4, 0, 2, 0),
  },
}));

export default function RewardScreen() {
  const { classes } = useStyles();

  return (
    <Grid

    >
      <Grid item xs={12}>
        <Header></Header>
        </Grid>
      <div>
        <Grid item className={classes.container}>
          <Angebote></Angebote>
        </Grid>
      </div>
    </Grid>
  );
}
