import React, { useState } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "tss-react/mui";
import { Grid, ListItemText } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CreateIcon from "@mui/icons-material/Create";
import Learning from "../components/Learning/Learning";
import LearningList from "../components/Learning/LearningList";

const useStyles = makeStyles()((theme) => ({
  containers: {
    alignItems: "center",
    display: "flex",
    paddingTop: theme.spacing(4),
  },
  icon: {
    color: "white",
    height: 30,
    width: 30,
  },
  button: {
    minWidth: "210px",
  },
  item: {
    margin: "16px",
  },
}));

export default function LearningScreen() {
  const { classes } = useStyles();
  const [form, setForm] = useState(true);

  const handleClick1 = () => {
    setForm(true);
  };

  const handleClick2 = () => {
    setForm(false);
  };

  return (
    <div>
      <Grid className={classes.containers} container>
        <Grid item xs={12} className={classes.item} md={2} lg={3}></Grid>
        <Grid item xs={12} className={classes.item} sm={7} md={4} lg={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick1}
          >
            <CreateIcon className={classes.icon} />

            <ListItemText primary={"Social"} />
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.item} sm={7} md={4} lg={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick2}
          >
            <FormatListBulletedIcon className={classes.icon} />

            <ListItemText primary={"List"} />
          </Button>
        </Grid>
        <Grid item xs={12} md={2} lg={3}></Grid>
      </Grid>
      {form ? <Learning /> : <LearningList />}
    </div>
  );
}
