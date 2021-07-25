import React from "react";
import ContentDisplay from "../components/ContentDisplay";
export default function MyContent(props) {
  return (
    <div>
      {/* used to map movies from DB into content for ContentDisplay Component. */}
      {props.movies.map((movie) => (
        <ContentDisplay
          movieId={movie.id}
          content={movie}
          onDelete={props.onDelete}
          watchList={props.watchList}
          addWatched={props.addWatched}
          addRating={props.addRating}
          setContent={props.setContent}
        />
      ))}
    </div>
  );
}
