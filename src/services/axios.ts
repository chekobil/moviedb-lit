import axios from "axios";
const createAxiosInstance = (baseURL: string, params: any) => {
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(function (config) {
    if (!params.api_key) {
      throw new Error("Error. missing api_key");
    }
    config.params = { ...config.params, ...params };
    return config;
  });
  return instance;
};
export default createAxiosInstance;
