import { Navbar } from "./components/Navigation/Navbar";
import { SidebarMini } from "./components/Navigation/SidebarMini";
import { Channel } from "./components/Channel/Channel";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Box, styled } from "@mui/material";
import { SidebarExpand } from "./components/Navigation/SidebarExpand";
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
  const [sideExpand, setSideExpand] = useState(false);
  const [inVideoPage, setInVideoPage] = useState(false);
  const [modalSideExpand, setModalSideExpand] = useState(false);
  const windowSize = GetWindowDimension();

  const handleSideExpand = (e) => {
    if (windowSize <= 1312 || inVideoPage) {
      setModalSideExpand(!modalSideExpand);
    } else {
      setSideExpand(!sideExpand);
    }
  };

  var currentURL = window.location.href.split("/");
  useLayoutEffect(() => {
    if (currentURL[3] === "watch") {
      setInVideoPage(true);
    }
  }, []);

  const handleInVideoPage = (inPage) => {
    setInVideoPage(inPage);
    if (modalSideExpand) {
      setSideExpand(modalSideExpand);
    }
  };

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

  useEffect(() => {
    if (windowSize > 1312) {
      setModalSideExpand(false);
    }
  }, [windowSize, sideExpand]);

  return (
    <div className="App">
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
            element={
              <Home
                windowSize={windowSize}
                setModalSideExpand={setModalSideExpand}
              />
            }
          />
          <Route
            path="/channel/*"
            element={
              <Channel
                sideExpand={sideExpand}
                windowSize={windowSize}
                setModalSideExpand={setModalSideExpand}
              />
            }
          />
          <Route
            path="/results"
            element={
              <SearchPage
                windowSize={windowSize}
                setModalSideExpand={setModalSideExpand}
              />
            }
          />
          <Route
            path="/watch"
            element={
              <VideoPage
                handleInVideoPage={handleInVideoPage}
                inVideoPage={inVideoPage}
                sideExpand={sideExpand}
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
