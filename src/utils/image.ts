export const getFullImagePath = (path: string) => {
  const basePath = "https://image.tmdb.org/t/p/w1280";
  return basePath + path;
};
