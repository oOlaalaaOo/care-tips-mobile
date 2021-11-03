export const debounce = (fn: Function, delay = 500) => {
  let timeoutID: any;

  return (...args: any) => {
    if (typeof timeoutID !== 'undefined') {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
