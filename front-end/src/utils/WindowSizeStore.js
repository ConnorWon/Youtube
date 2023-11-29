import { useSyncExternalStore } from "react";

export const GetWindowDimension = () => {
  const size = useSyncExternalStore(subscribe, getSnapshot);
  return size;
};

function getSnapshot() {
  return window.innerWidth;
}

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}
