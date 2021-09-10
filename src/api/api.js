import axios from "axios";
import { API_KEY } from "./key";

const baseUrl = "https://api.themoviedb.org/3";
const moviesNowPlayingUrl = `${baseUrl}/movie/now_playing`;
const moviesPopularUrl = `${baseUrl}/movie/popular`;
const moviesTopUrl = `${baseUrl}/movie/top_rated`;
const searchMoviesUrl = `${baseUrl}/search/movie`;
const movieDetailsUrl = `${baseUrl}/movie/`;
const personUrl = `${baseUrl}/person/`;

//https://developers.themoviedb.org/3/getting-started/images
export const imageUrl = "https://image.tmdb.org/t/p/w500";
export const personThumbnailUrl =
  "https://image.tmdb.org/t/p/w138_and_h175_face";
export const largeImageUrl = "https://image.tmdb.org/t/p/original";

export const formatResults = (movie) => {
  const { id, poster_path, release_date, title, vote_average } = movie;

  return {
    id,
    release_date,
    title,
    vote_average,
    poster: imageUrl + poster_path,
  };
};

const formatResultsDetails = (movie) => {
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

  // fetch MPAA rating for US release
  let ratingUs = movie.release_dates.results.find((e) => e.iso_3166_1 === "US");
  let rating = ratingUs.release_dates[0].certification;

  // fetch director(s) from crew list
  let directors = [];
  movie.credits.crew.forEach((crewMember) => {
    if (crewMember.job === "Director") {
      directors.push(crewMember);
    }
  });

  // fetch writer(s) from crew list
  let writers = [];
  movie.credits.crew.forEach((crewMember) => {
    if (
      crewMember.job === "Writer" ||
      crewMember.job === "Screenplay" ||
      crewMember.job === "Novel" ||
      crewMember.job === "Characters"
    ) {
      writers.push(crewMember);
    }
  });

  const {
    id,
    credits,
    external_ids,
    genres,
    homepage,
    keywords,
    backdrop_path,
    overview,
    poster_path,
    release_date,
    release_dates,
    title,
    vote_average,
    vote_count,
    runtime,
    tagline,
    budget,
    revenue,
    status,
  } = movie;

  return {
    id,
    credits,
    directors,
    external_ids,
    genres,
    homepage,
    keywords: keywords.keywords,
    overview,
    release_date,
    release_dates,
    title,
    vote_average,
    vote_count,
    runtime,
    tagline,
    budget,
    revenue,
    rating,
    status,
    writers,
    movieTrailerKey,
    recommended: movie.recommendations.results,
    backdrop: largeImageUrl + backdrop_path,
    poster: imageUrl + poster_path,
  };
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(movieDetailsUrl + movieId, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        append_to_response:
          "videos,credits,external_ids,recommendations,release_dates,reviews,keywords",
      },
    });
    //console.log(formatResultsDetails(data));
    //console.dir("DATA HERE ", data)
    return formatResultsDetails(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPersonDetails = async (personId) => {
  try {
    const { data } = await axios.get(personUrl + personId, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        append_to_response:
          "combined_credits,external_ids,images",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchNewMovieReleases = async () => {
  try {
    const { data } = await axios.get(moviesNowPlayingUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
        region: "US",
      },
    });

    return data.results.map((movie) => {
      return formatResults(movie);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    const { data } = await axios.get(moviesPopularUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
        region: "US",
      },
    });

    return data.results.map((movie) => {
      return formatResults(movie);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopMovies = async () => {
  try {
    const { data } = await axios.get(moviesTopUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
        region: "US",
      },
    });

    return data.results.map((movie) => {
      return formatResults(movie);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieSearchResults = async (query) => {
  try {
    const { data } = await axios.get(searchMoviesUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        query: query,
        page: 1,
        include_adult: false,
      },
    });

    return data.results.map((movie) => {
      return formatResults(movie);
    });
  } catch (error) {
    console.error(error);
  }
};
