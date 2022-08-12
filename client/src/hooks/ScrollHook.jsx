import React from "react";
export const ScrollHook = () => {
  const hiddenScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const showScroll = React.useCallback(() => {
    document.body.style.overflow = "auto";
  }, []);
  return {
    hiddenScroll,
    showScroll,
  };
};
