import { makeStyles } from "tss-react/mui";

const useStyle = makeStyles()((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(3),
  },
}));

export default function HelpScreen() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <h1>Help</h1>
      <h1>Help</h1>
      <p></p>
    </div>
  );
}
