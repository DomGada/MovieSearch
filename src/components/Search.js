import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
//import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    textAlign: "center",
  },
  btn: {
    marginRight: "0px",
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [movieYear, setMovieYear] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [media, setMedia] = useState("");
  const [invalidMovieLen, setMovieLength] = useState(false);
  const handleSubmit = (e) => {
    //When our search button is used.
    if (movieTitle.length >= 1) {
      setMovieLength(false);
      e.preventDefault(); // preventing page reload
      let url = "";
      setMovieTitle(movieTitle.replace(" ", "+")); // for the API it needs + instead of space so managing state of the movieTitle
      if (movieYear) {
        // if there was a movie year proviced then query that too, if not proceed.
        url = `http://www.omdbapi.com/?t=${movieTitle}&type=${media}&y=${movieYear}&apikey=${process.env.REACT_APP_API_KEY}`;
      } else {
        url = `http://www.omdbapi.com/?t=${movieTitle}&type=${media}&apikey=${process.env.REACT_APP_API_KEY}`;
      }
      axios
        .get(url, {})
        .then(function (response) {
          // handle success
          let result = response.data;
          props.setContent({
            title: result.Title,
            year: result.Year,
            description: result.Plot,
            watched: false,
          });
          console.log(result);
        })
        .catch(function (error) {
          // handle error
          console.log("The error is : ", error);
        });
    } else {
      setMovieLength(true);
    }
  };
  //api key 2e6eb696
  // Make a request for a user with a given ID

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {invalidMovieLen && (
        <Alert severity="error">
          Movie name must be more than 1 character!
        </Alert>
      )}
      <div>
        <TextField
          id="standard-full-width"
          label="Movie Title"
          style={{ margin: 8 }}
          placeholder="Ex: The Mask"
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={(e) => setMovieTitle(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="standard-full-width"
          label="Movie Year"
          style={{ margin: 8 }}
          placeholder="Ex: 1976"
          helperText=""
          fullWidth
          margin="normal"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setMovieYear(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <InputLabel>Type of Media</InputLabel>
        <Select native onChange={(e) => setMedia(e.target.value)}>
          <option aria-label="None" value="" />
          <option value={"movie"}>Movie</option>
          <option value={"series"}>Series</option>
          <option value={"episode"}>Episode</option>
        </Select>
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          className={classes.btn}
          onClick={handleSubmit}
          style={{ marginRight: "5px" }}
        >
          Search
        </Button>
        <Button variant="outlined" to={"/"}>
          Close
        </Button>
      </div>
    </form>
  );
}
