import axios from "axios";
import {
  imageUrl,
  movieDetailsUrl,
  movieDiscoverUrl,
  moviesNowPlayingUrl,
  moviesPopularUrl,
  moviesTopUrl,
  personUrl,
  searchUrl,
  tvDetailsUrl,
  tvNowPlayingUrl,
  tvPopularUrl,
  tvTopUrl,
} from "./constants";
import { API_KEY } from "./key";

export const formatResults = (movie) => {
  const { id, poster_path, release_date, title, vote_average, overview } =
    movie;

  return {
    id,
    release_date,
    title,
    vote_average,
    poster_path,
    overview,
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
    console.dir(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTvDetails = async (tvId) => {
  try {
    const { data } = await axios.get(tvDetailsUrl + tvId, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        append_to_response:
          "videos,credits,external_ids,recommendations,reviews,keywords",
      },
    });
    console.dir(data);
    return data;
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
        append_to_response: "combined_credits,external_ids,images",
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

export const fetchNewTv = async () => {
  try {
    const { data } = await axios.get(tvNowPlayingUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
      },
    });

    return data.results;
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

export const fetchPopularTv = async () => {
  try {
    const { data } = await axios.get(tvPopularUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
      },
    });

    return data.results;
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

export const fetchTopTv = async () => {
  try {
    const { data } = await axios.get(tvTopUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        page: 1,
      },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
};

export const discoverMovies = async (id, genre, keyword) => {
  try {
    const { data } = await axios.get(movieDiscoverUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        region: "US",
        sort_by: "popularity.desc",
        page: 1,
        ...(genre ? {with_genres: id} : {}),
        ...(keyword ? {with_keywords: id} : {}),
      },
    });

    return data.results.map((movie) => {
      return formatResults(movie);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchResults = async (query) => {
  try {
    const { data } = await axios.get(searchUrl, {
      params: {
        api_key: API_KEY,
        language: "en_US",
        query: query,
        page: 1,
        include_adult: false,
      },
    });

    let movieResults = [];
    let tvResults = [];
    let peopleResults = [];

    data.results.forEach((result) => {
      if (result.media_type === "movie") {
        movieResults.push(result);
      }

      if (result.media_type === "tv") {
        tvResults.push(result);
      }

      if (result.media_type === "person") {
        peopleResults.push(result);
      }
    });

    return {
      movieResults,
      tvResults,
      peopleResults,
    };
  } catch (error) {
    console.error(error);
  }
};
