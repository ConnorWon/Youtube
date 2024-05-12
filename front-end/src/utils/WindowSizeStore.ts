import { useSyncExternalStore } from "react";

export const GetWindowDimension = () => {
  return useSyncExternalStore(subscribe, getSnapshot);
};

function getSnapshot() {
  return window.innerWidth;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}
