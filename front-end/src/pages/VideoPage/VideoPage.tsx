import { useContext, useEffect, useRef } from "react";
import {
  CSSValueProvider,
  MainContainer,
  Primary,
  PrimaryInner,
  Secondary,
  SecondaryInner,
} from "./Styling";
import { VideoPlayer } from "./Player/VideoPlayer/VideoPlayer";
import { BelowPlayer } from "./Player/BelowPlayer/BelowPlayer";
import { VideoPageSidebar } from "./Sidebar/VideoPageSidebar";
import { GetWindowDimension } from "../../utils/WindowSizeStore";
import { SidebarContext } from "../../contexts/SidebarContext";

export const VideoPage = () => {
  const {
    setNoMiniSideBar,
    noMiniSideBar,
    setSideExpand,
    setModalSideExpand,
    modalSideExpand,
  } = useContext(SidebarContext);

  // used for tracking window size
  const windowSize = GetWindowDimension();

  // signals that noMiniSideBar on component mount and on dismount signals not in videoPage
  useEffect(() => {
    setNoMiniSideBar(true);
    return () => {
      setNoMiniSideBar(false);
    };
  }, []);

  // tracks whether component is unmounting
  const componentWillUnMount = useRef<boolean>(false);
  // changes unmount ref when component is unmounting
  useEffect(() => {
    return () => {
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

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  return (
    <CSSValueProvider>
      <MainContainer>
        <Primary>
          <PrimaryInner>
            <VideoPlayer noMiniSideBar={noMiniSideBar} />
            <BelowPlayer />
          </PrimaryInner>
        </Primary>
        <Secondary>
          <SecondaryInner>
            <VideoPageSidebar />
          </SecondaryInner>
        </Secondary>
      </MainContainer>
    </CSSValueProvider>
  );
};
