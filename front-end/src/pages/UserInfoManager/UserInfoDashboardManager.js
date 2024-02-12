import { useContext, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AllChannelsDashboard } from "./AllChannelsDashboard";
import { GetWindowDimension } from "../../utils/WindowSizeStore";
import { SidebarContext } from "../../contexts/SidebarContext";

export const UserInfoDashboardManager = () => {
  const {
    setNoMiniSideBar,
    setSideExpand,
    setModalSideExpand,
    modalSideExpand,
  } = useContext(SidebarContext);

  // used for tracking window size
  const windowSize = GetWindowDimension();

  // tracks whether component is unmounting
  const componentWillUnMount = useRef(false);

  useEffect(() => {
    setModalSideExpand(false);
    setNoMiniSideBar(true);
    return () => {
      setNoMiniSideBar(false);
      // changes unmount ref when component is unmounting so next useEffect knows when to actually run
      componentWillUnMount.current = true;
    };
  }, []);

  // opens sideExpand if modalSideExpand is true and windowSize > 1312px
  useEffect(() => {
    return () => {
      if (
        modalSideExpand &&
        componentWillUnMount.current &&
        windowSize > 1312
      ) {
        setSideExpand(modalSideExpand);
      }
    };
  }, [modalSideExpand, windowSize]);

  return (
    <Routes>
      <Route path="" element={<AllChannelsDashboard />} />
    </Routes>
  );
};
