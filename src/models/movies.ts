import useAxios from "../services/useAxios";

export const fetchMovieList = async (): Promise<
  MoviesResponse | EmptyResponse
> => {
  const url = "/discover/movie";
  const params: FetchParams = {
    sort_by: "popularity.desc",
  };
  try {
    const res = await useAxios(url, {
      params,
    });
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
};

export const searchMovieList = async (
  params: SearchParams = { query: "" }
): Promise<MoviesResponse | EmptyResponse> => {
  const url = "search/movie";
  try {
    const res = await useAxios(url, {
      params,
    });
    const rawResults = res.data.results;
    rawResults.sort((a: Movie, b: Movie) => b.popularity - a.popularity);
    res.data.results = rawResults;
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
};
