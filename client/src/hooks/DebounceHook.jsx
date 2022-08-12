import { useCallback } from "react";
export const DebounceHook = (cb, delay) => {
  const debounce = () => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        cb(...args);
      }, delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce());
  return {
    debounceSearch,
  };
};
