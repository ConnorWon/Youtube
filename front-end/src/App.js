import { Navbar } from "./components/Navigation/Navbar/Navbar";
import { SidebarMini } from "./components/Navigation/Sidebar/SidebarMini";
import { Channel } from "./components/Channel/Channel";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Box, styled } from "@mui/material";
import { SidebarExpand } from "./components/Navigation/Sidebar/SidebarExpand";
import { useState, useLayoutEffect, useEffect } from "react";
import { VideoPage } from "./components/VideoPage/VideoPage";
import { GetWindowDimension } from "./components/WindowSizeStore";

const PageContainer = styled(Box)`
  height: calc(100% - 56px);
  position: relative;
  margin-top: 56px;
  overflow-x: clip;
  max-width: 100%;
`;

function App() {
  // state tracking expansion of sidebar
  const [sideExpand, setSideExpand] = useState(false);
  // state tracking whether in videoPage (necessary b/c videoPage has slight differences in page layout than the other pages)
  const [inVideoPage, setInVideoPage] = useState(false);
  // state tracking expansion of sidebar when expanding results in a modal sidebar (<= 1312px window size)
  const [modalSideExpand, setModalSideExpand] = useState(false);
  // used for tracking window size
  const windowSize = GetWindowDimension();

  const handleSideExpand = (e) => {
    if (windowSize <= 1312 || inVideoPage) {
      setModalSideExpand(!modalSideExpand);
    } else {
      setSideExpand(!sideExpand);
    }
  };

  // ensures page layout is proper for when going to videoPage from outside YouTube
  var currentURL = window.location.href.split("/");
  useLayoutEffect(() => {
    if (currentURL[3] === "watch") {
      setInVideoPage(true);
    }
  }, []);

  // deals with resizing the main page container
  useEffect(() => {
    const main = document.getElementById("main");
    if (inVideoPage || windowSize < 791) {
      main.style.width = "100%";
      main.style.marginLeft = "0";
    } else if (windowSize > 791 && (!sideExpand || windowSize <= 1312)) {
      main.style.width = "calc(100% - 72px)";
      main.style.marginLeft = "72px";
    } else if (windowSize > 1312 && sideExpand) {
      main.style.width = "calc(100% - 240px)";
      main.style.marginLeft = "240px";
    }
  }, [windowSize, sideExpand, inVideoPage]);

  // resets modalSideExpand upon reaching max window size for the modal sidebar
  useEffect(() => {
    if (windowSize > 1312 && !inVideoPage) {
      setModalSideExpand(false);
    }
  }, [windowSize, sideExpand, inVideoPage]);

  return (
    <div>
      <Navbar handleSideExpand={handleSideExpand} />
      <SidebarExpand
        sideExpand={sideExpand}
        inVideoPage={inVideoPage}
        modalSideExpand={modalSideExpand}
      />
      <SidebarMini sideExpand={sideExpand} inVideoPage={inVideoPage} />
      <PageContainer id="main" inVideoPage={inVideoPage}>
        <Routes>
          <Route
            path="/"
            element={<Home setModalSideExpand={setModalSideExpand} />}
          />
          <Route
            path="/channel/*"
            element={
              <Channel
                sideExpand={sideExpand}
                setModalSideExpand={setModalSideExpand}
              />
            }
          />
          <Route
            path="/results"
            element={<SearchPage setModalSideExpand={setModalSideExpand} />}
          />
          <Route
            path="/watch"
            element={
              <VideoPage
                setInVideoPage={setInVideoPage}
                inVideoPage={inVideoPage}
                setSideExpand={setSideExpand}
                setModalSideExpand={setModalSideExpand}
                modalSideExpand={modalSideExpand}
              />
            }
          />
        </Routes>
      </PageContainer>
    </div>
  );
}

export default App;
