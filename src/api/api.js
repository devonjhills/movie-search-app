import axios from "axios";
import { API_KEY } from "./key";

const baseUrl = "https://api.themoviedb.org/3";
const moviesNowPlayingUrl = `${baseUrl}/movie/now_playing`;
const moviesPopularUrl = `${baseUrl}/movie/popular`;
const moviesTopUrl = `${baseUrl}/movie/top_rated`;
const searchMoviesUrl = `${baseUrl}/search/movie`;
const movieDetailsUrl = `${baseUrl}/movie/`;

//https://developers.themoviedb.org/3/getting-started/images
const imageUrl = "https://image.tmdb.org/t/p/w500";

const formatResults = (movie) => {
  const {
    id,
    backdrop_path,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
    vote_count,
  } = movie;

  return {
    id,
    overview,
    release_date,
    title,
    vote_average,
    vote_count,
    backdrop: imageUrl + backdrop_path,
    poster: imageUrl + poster_path,
  };
};

const formatResultsDetails = (movie) => {
  let movieTrailerKey = "";
  let officialTrailer = "";
  let trailer = "";

  let ratingUs = movie.release_dates.results.find((e) => e.iso_3166_1 === "US");
  let rating = ratingUs.release_dates[0].certification;

  officialTrailer = movie.videos.results.find((e) =>
    e.name.includes("Official Trailer")
  );
  if (!officialTrailer) {
    trailer = movie.videos.results.find((e) => e.name.includes("Trailer"));
  }

  officialTrailer
    ? (movieTrailerKey = officialTrailer.key)
    : (movieTrailerKey = trailer && trailer.key);

  const {
    id,
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
  } = movie;

  return {
    id,
    overview,
    release_date,
    release_dates,
    title,
    vote_average,
    vote_count,
    runtime,
    tagline,
    rating,
    movieTrailerKey,
    backdrop: imageUrl + backdrop_path,
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
          "videos,credits,external_ids,recommendations,similar,release_dates,reviews",
      },
    });

    console.log(data)

    return formatResultsDetails(data);
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
