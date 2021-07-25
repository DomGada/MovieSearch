import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { isBrowser, isMobile } from "react-device-detect"; //
export default function ContentDisplay(props) {
  const [watched, setWatched] = useState(props.content.watched);
  const [rating, setRating] = useState(props.content.rating);
  const [plot, setPlot] = useState(props.content.description);
  const useStyles = makeStyles({
    root: {
      margin: "5px",
    },
    watched: {
      margin: "5px",
      border: "1px solid green",
    },
    pos: {
      marginBottom: 12,
    },
  });

  //Query API for more plot. uses more query but you cant return both long and short plot.
  const morePlot = () => {
    //When our search button is used.
    // preventing page reload
    let url = "";
    const newTitle = props.content.title.replace(" ", "+"); // for the API it needs + instead of space so managing state of the movieTitle
    url = `http://www.omdbapi.com/?t=${newTitle}&plot=full&apikey=${process.env.REACT_APP_API_KEY}`;
    axios
      .get(url, {})
      .then(function (response) {
        // handle success
        let result = response.data;
        setPlot(result.Plot);
      })
      .catch(function (error) {
        // handle error
        console.log("The error is : ", error);
      });
  };
  const classes = useStyles();
  return (
    <Card
      className={(!watched && classes.root) || (watched && classes.watched)}
      variant="outlined"
    >
      <CardContent>
        {/* Begin Browser Section */}
        {isBrowser && (
          <Typography variant="h1" color="textSecondary" gutterBottom>
            {props.content.title}
          </Typography>
        )}
        {/* using props to check which route were on, and whether the content has been watched */}
        {isBrowser && props.watchList && watched && (
          <Typography variant="h4" color="textSecondary" gutterBottom>
            {`Rating:${rating}`}
          </Typography>
        )}

        {/* End Browser Section */}

        {/* Mobile version of above. Different styling applied for fit. */}
        {isMobile && (
          <Typography variant="h2" color="textSecondary" gutterBottom>
            {props.content.title}
          </Typography>
        )}
        {isMobile && props.watchList && (
          <Typography variant="h4" color="textSecondary" gutterBottom>
            {`Rating:${rating}`}
          </Typography>
        )}

        {/* year display */}
        <Typography className={classes.pos} color="textSecondary">
          {props.content.year}
        </Typography>
        {/* Movie Plot */}
        <Typography variant="body1" component="p">
          {plot}
          <br />
        </Typography>
        {/* More Plot button queries api for full plot variant */}
        <Button variant="contained" color="default" onClick={morePlot}>
          More Plot?
        </Button>
      </CardContent>
      {/* using prop to see if we are on main menu or in watchlist route. */}
      {props.watchList && (
        <CardActions>
          <Button
            onClick={() => props.onDelete(props.movieId)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Remove?
          </Button>
          {watched && (
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                props.addWatched(props.content.id);
                setWatched(!watched);
                props.setContent({ watched: !props.content.watched });
              }}
            >
              Completed!
            </Button>
          )}
          {/* if the user has watched the show give them the option to rate it. */}
          {watched && (
            <div style={{ marginBottom: "5px" }}>
              <InputLabel>Rating/10</InputLabel>
              <Select native onChange={(e) => setRating(e.target.value)}>
                <option aria-label="None" value="" />
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </Select>
              <Button
                onClick={() => {
                  props.setContent({ rating: rating });
                  props.addRating(props.content.id, rating);
                }}
              >
                Rate!
              </Button>
            </div>
          )}
          {/* given they have not watched the show change button options */}
          {!watched && (
            <Button
              color="Primary"
              variant="contained"
              size="small"
              onClick={() => {
                props.addWatched(props.content.id);
                setWatched(!watched);
                props.setContent({ watched: !props.content.watched });
              }}
            >
              Mark as Watched?
            </Button>
          )}
        </CardActions>
      )}
      <CardActions>
        {/* main menu button display */}
        {!props.watchList && (
          <Button
            color="primary"
            variant="contained"
            onClick={props.addMovie}
            size="small"
          >
            Add to watchlist?
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
