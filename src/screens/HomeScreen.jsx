import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import bild from "../assets/images/start.jpg";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function HomeScreen() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: "#898989" }}
          >
            Making impact through athletic socializing
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12}>
              <img src={bild} width="900" alt="c" />
            </Grid>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
