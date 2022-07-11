import React from "react";
import Container from "@mui/material/Container";
import { makeStyles } from "tss-react/mui";
export const drawerWidth = 240;

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    position: "relative",
  },
}));

export default function ContentArea({ children }) {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}
