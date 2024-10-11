import axios from "axios";
const createAxiosInstance = (baseURL: string, params: any) => {
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(function (config) {
    if (!params.api_key) {
      console.error("Error. api_key param is required");
      throw new Error("missing api_key");
    }
    config.params = { ...config.params, ...params };
    return config;
  });
  return instance;
};
const useAxios = createAxiosInstance("https://api.themoviedb.org/3", {
  api_key: import.meta.env.VITE_MOVIEDB_API_KEY,
});

export const getMovieList = async () => {
  const url = "discover/movie";
  try {
    const res = await useAxios(url);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
};
