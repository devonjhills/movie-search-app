export const getMovieTrailer = (movie) => {
  // Attempt to fetch video matching 'Official Trailer', then 'Trailer', or return undefined
  let movieTrailerKey = "";
  let officialTrailer = "";
  let trailer = "";

  officialTrailer = movie.videos.results.find((e) =>
    e.name.includes("Official Trailer")
  );
  if (!officialTrailer) {
    trailer = movie.videos.results.find((e) => e.name.includes("Trailer"));
  }

  officialTrailer
    ? (movieTrailerKey = officialTrailer.key)
    : (movieTrailerKey = trailer && trailer.key);

  return movieTrailerKey;
};

export const getShowTrailer = (show) => {
  // Attempt to fetch video matching 'Official Trailer', then 'Trailer', or return undefined
  let trailerKey = "";
  let trailer = "";

  trailer = show.videos.results.find((e) => e.name.includes("Trailer"));

  trailerKey = trailer && trailer.key;

  return trailerKey;
};

export const getMovieRating = (movie) => {
  // fetch MPAA rating for US release
  let ratingUs = movie.release_dates?.results?.find(
    (e) => e.iso_3166_1 === "US"
  );
  let rating = ratingUs?.release_dates[0].certification;

  return rating;
};

export const getMovieDirectors = (movie) => {
  // fetch director(s) from crew list
  let directors = movie.credits.crew.filter(
    (crewMember) => crewMember.job === "Director"
  );

  return directors;
};

export const getMovieWriters = (movie) => {
  // fetch writer(s) from crew list
  let writers = movie.credits.crew.filter(
    (crewMember) =>
      crewMember.job === "Writer" ||
      crewMember.job === "Screenplay" ||
      crewMember.job === "Novel" ||
      crewMember.job === "Characters"
  );

  return writers;
};
