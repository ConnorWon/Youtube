import {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from "react";

interface SidebarContextStructure {
    sideExpand: boolean,
    setSideExpand: Dispatch<SetStateAction<boolean>>,
    noMiniSideBar: boolean,
    setNoMiniSideBar: Dispatch<SetStateAction<boolean>>,
    modalSideExpand: boolean,
    setModalSideExpand: Dispatch<SetStateAction<boolean>>,
}

// SidebarContext
export const SidebarContext = createContext<SidebarContextStructure>({
  sideExpand: false,
  setSideExpand: () => {},
  noMiniSideBar: false,
  setNoMiniSideBar: () => {},
  modalSideExpand: false,
  setModalSideExpand: () => {},
});

// SidebarContextProvider component
export const SidebarContextProvider: FC<{children: ReactNode}> = ({children}) => {
  // state tracking expansion of sidebar
  const [sideExpand, setSideExpand] = useState<boolean>(false);
  // state tracking whether in videoPage (necessary b/c videoPage has slight differences in page layout than the other pages)
  const [noMiniSideBar, setNoMiniSideBar] = useState<boolean>(false);
    // state tracking expansion of sidebar when expanding results in a modal sidebar (<= 1312px window size)
  const [modalSideExpand, setModalSideExpand] = useState<boolean>(false);

    return (
    <SidebarContext.Provider
      value={{
        sideExpand,
        setSideExpand,
        noMiniSideBar,
        setNoMiniSideBar,
        modalSideExpand,
        setModalSideExpand,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
