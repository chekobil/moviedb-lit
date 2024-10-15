import useAxios from "../services/useAxios";

export const fetchMovieList = async (): Promise<
  MoviesResponse | EmptyResponse
> => {
  const url = "/discover/movie";
  try {
    const res = await useAxios(url);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
};
