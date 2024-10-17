let debounceT: any;
// Ejecuta la ultima de las llamadas, y cancela las anteriores
export const debouncedMethod = (theFunction: any, delay = 500) => {
  if (debounceT) {
    clearTimeout(debounceT);
  }
  debounceT = setTimeout(() => {
    theFunction.call();
  }, delay);
};
