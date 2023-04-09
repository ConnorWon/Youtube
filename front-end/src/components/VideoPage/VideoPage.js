import React, { useEffect, useRef } from "react";
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
import { GetWindowDimension } from "../WindowSizeStore";

export const VideoPage = (props) => {
  const {
    setInVideoPage,
    inVideoPage,
    setSideExpand,
    setModalSideExpand,
    modalSideExpand,
  } = props;

  // used for tracking window size
  const windowSize = GetWindowDimension();

  // signals that inVideoPage on component mount and on dismount signals not in videoPage
  useEffect(() => {
    setInVideoPage(true);
    return () => {
      setInVideoPage(false);
    };
  }, []);

  // tracks whether component is unmounting
  const componentWillUnMount = useRef(false);
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
            <VideoPlayer inVideoPage={inVideoPage} />
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
