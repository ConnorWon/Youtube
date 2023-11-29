import { createContext, useState } from "react";

// SidebarContext
export const SidebarContext = createContext({
  sideExpand: false,
  setSideExpand: () => {},
  inVideoPage: false,
  setInVideoPage: () => {},
  modalSideExpand: false,
  setModalSideExpand: () => {},
});

// SidebarContextProvider component
export function SidebarContextProvider(props) {
  // state tracking expansion of sidebar
  const [sideExpand, setSideExpand] = useState(false);
  // state tracking whether in videoPage (necessary b/c videoPage has slight differences in page layout than the other pages)
  const [inVideoPage, setInVideoPage] = useState(false);
  // state tracking expansion of sidebar when expanding results in a modal sidebar (<= 1312px window size)
  const [modalSideExpand, setModalSideExpand] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        sideExpand,
        setSideExpand,
        inVideoPage,
        setInVideoPage,
        modalSideExpand,
        setModalSideExpand,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
}
