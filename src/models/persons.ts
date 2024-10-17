import useAxios from "../services/useAxios";

export const searchPerson = async (
  params: SearchParams = { query: "" }
): Promise<MoviesResponse | EmptyResponse> => {
  const url = "search/person";
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
