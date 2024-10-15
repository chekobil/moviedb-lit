import useAxios from "../services/useAxios";

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetail | EmptyResponse> => {
  const url = `/movie/${movieId}`;
  try {
    const res = await useAxios(url);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
};
