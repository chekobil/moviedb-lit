import createAxiosInstance from "./axios";

const useAxios = createAxiosInstance("https://api.themoviedb.org/3", {
  api_key: import.meta.env.VITE_MOVIEDB_API_KEY,
});

export default useAxios;
