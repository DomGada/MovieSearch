import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Search from "../components/Search";
const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 400,
    margin: "5px",
  },
  title: {
    textAlign: "center",
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    // outter card component for search drop down.
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          variant="h4"
        >
          Search a movie!
        </Typography>
        <Search content={props.content} setContent={props.setContent} />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
