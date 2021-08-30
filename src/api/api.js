import axios from "axios";
import { API_KEY } from "./key";

const baseUrl = "https://api.themoviedb.org/3";
const trendingMoviesDayUrl = `${baseUrl}/trending/movie/day`;

//https://developers.themoviedb.org/3/getting-started/images
const imageUrl = "https://image.tmdb.org/t/p/original";

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

export const fetchTrendingMoviesDay = async () => {
  try {
    const { data } = await axios.get(trendingMoviesDayUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
      },
    });

    return data.results.map((movie) => {
      return formatResults(movie);
    });
  } catch (error) {
    console.error(error);
  }
};
