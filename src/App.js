import "./App.css";
import Nav from "./components/Nav";
import Container from "@material-ui/core/Container";
import SearchCard from "./components/SearchCard";
import ContentDisplay from "./components/ContentDisplay";
import MyContent from "./components/MyContent";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { isBrowser, isMobile } from "react-device-detect"; // use to seperate Mobile and Desktop displays
function App() {
  const [movies, setMovies] = useState([]);

  const [hideMenu, setHideMenu] = useState(true);
  const [content, setContent] = useState({
    title: "",
    year: "",
    description: "",
    watched: false,
    rating: null,
  });
  useEffect(() => {
    const getMovies = async () => {
      const moviesFromServer = await fetchMovies();
      setMovies(moviesFromServer);
    };
    getMovies();
  }, []);

  // Fetch ALL Movies
  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/movies");
    const data = await res.json();
    return data;
  };
  //Fetch a signle movie by ID
  const fetchOneMovie = async (id) => {
    const res = await fetch(`http://localhost:5000/movies/${id}`);
    const data = await res.json();
    return data;
  };

  // const addSearchL = async () => {
  //   const res = await fetch("http://localhost:5000/searchlist", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(content),
  //   });
  //   const data = await res.json();
  //   setSearchList([...searchList, data]);
  // }; // This was an attempt at adding pagnation using a seperate DB to store
  //search results.

  //Add a single movie to our Json.db
  const addMovie = async () => {
    const res = await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const data = await res.json();

    setMovies([...movies, data]);
  };

  //Delete Movie by ID
  const deleteMovie = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, {
      method: "DELETE",
    });
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  //Toggle watched boolean
  const addWatched = async (id) => {
    const watchedMovie = await fetchOneMovie(id);
    const updateMovie = { ...watchedMovie, watched: !watchedMovie.watched };
    const res = await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateMovie),
    });
    const data = await res.json();
  };

  //update rating of movie
  const addRating = async (id, rating) => {
    const watchedMovie = await fetchOneMovie(id);
    const updateMovie = { ...watchedMovie, rating: rating };
    const res = await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateMovie),
    });
    const data = await res.json();
  };

  return (
    <Router>
      {/* utilize router to direct path. */}
      <Route path="/" exact>
        <div className="App">
          <Container maxWidth="lg">
            <Nav
              watchList={false}
              setHideMenu={setHideMenu}
              hideMenu={hideMenu}
            />
            {/* search card takes in the state of our content, it will pass it down 
      to our search component that will allow us to change it to then pass to content
      display. */}
            {/* React Device detect for mobile and desktop scaling. */}
            {isMobile && (
              <div>
                {hideMenu && (
                  <SearchCard content={content} setContent={setContent} />
                )}
                {content.title !== "" && (
                  <ContentDisplay
                    movieId={content.id}
                    content={content}
                    addMovie={addMovie}
                    watchList={false}
                  />
                )}
              </div>
            )}

            {isBrowser && (
              <div style={{ display: "flex" }}>
                {hideMenu && ( // using hidemenu state to toggle search.
                  <SearchCard content={content} setContent={setContent} />
                )}
                {content.title !== "" && (
                  <ContentDisplay
                    movieId={content.id}
                    content={content}
                    addMovie={addMovie}
                    watchList={false}
                  />
                )}
              </div>
            )}
          </Container>
        </div>
        {/* check if we're on watch list.  */}
      </Route>
      {/* Route if we are on users watch list. */}
      <Route path="/watchlist">
        <Container maxWidth="md">
          <Nav watchList={true} />
          <MyContent
            //using my content to pass all movie props to reuse in content display.
            movies={movies}
            onDelete={deleteMovie}
            watchList={true}
            addWatched={addWatched}
            addRating={addRating}
            setContent={setContent}
          />
        </Container>
      </Route>
    </Router>
  );
}

export default App;
