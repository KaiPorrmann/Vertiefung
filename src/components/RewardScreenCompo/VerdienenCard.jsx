import React from "react";
import { makeStyles } from "tss-react/mui";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    borderRadius: 16,
    maxWidth: 400,
    minWidth: 200,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    width: 220,
    height: 160,
  },
  cover: {
    width: 210,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function VerdienenCard({
  title,
  subtitle,
  image,
  cardLink,
  buttonText,
}) {
  const { classes } = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {subtitle}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button
            component={Link}
            to={cardLink}
            variant="contained"
            size="small"
            color="primary"
          >
            {buttonText}
          </Button>
        </div>
      </div>
      <CardMedia className={classes.cover} image={image} title="Tokens" />
    </Card>
  );
}
