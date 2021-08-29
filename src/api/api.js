import axios from "axios";
import { API_KEY } from "./key";

export const fetchTrendingMoviesDay = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
