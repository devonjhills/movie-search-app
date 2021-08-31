import axios from "axios";
import { API_KEY } from "./key";

const baseUrl = "https://api.themoviedb.org/3";
const moviesNowPlayingUrl = `${baseUrl}/movie/now_playing`;
const searchMoviesUrl = `${baseUrl}/search/movie`;

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
  } = movie;

  return {
    id,
    overview,
    release_date,
    title,
    vote_average,
    backdrop: imageUrl + backdrop_path,
    poster: imageUrl + poster_path,
  };
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

    console.log(data.results);

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
