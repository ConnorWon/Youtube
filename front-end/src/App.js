import { Navbar } from "./components/Navigation/Navbar";
import { SidebarMini } from "./components/Navigation/SidebarMini";
import { Channel } from "./components/Channel/Channel";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Box, styled } from "@mui/material";
import { SidebarExpand } from "./components/Navigation/SidebarExpand";
import { useState, useLayoutEffect } from "react";
import { VideoPage } from "./components/VideoPage/VideoPage";

const PageContainer = styled(Box)`
  width: ${({ inVideoPage }) => (inVideoPage ? "100%" : "calc(100% - 72px)")};
  height: calc(100% - 56px);
  position: relative;
  margin-top: 56px;
  margin-left: ${({ inVideoPage }) => (inVideoPage ? "0" : "72px")};
  overflow-x: clip;
  max-width: 100%;

  @media only screen and (max-width: 791px) {
    width: ${({ inSearchPage, inVideoPage }) =>
      inSearchPage || inVideoPage ? "100%" : "calc(100% - 72px)"};
    margin-left: ${({ inSearchPage, inVideoPage }) =>
      inSearchPage || inVideoPage ? "0" : "72px"};
  }
`;

function App() {
  const [sideExpand, setSideExpand] = useState(false);
  const [inSearchPage, setInSearchPage] = useState(false);
  const [inVideoPage, setInVideoPage] = useState(false);

  const handleSideExpand = (e) => {
    setSideExpand(!sideExpand);
    const main = document.getElementById("main");
    if (!sideExpand) {
      main.style.width = "calc(100% - 240px)";
      main.style.marginLeft = "240px";
    } else {
      main.style.width = "calc(100% - 72px)";
      main.style.marginLeft = "72px";
    }
  };

  var currentURL = window.location.href.split("/");
  useLayoutEffect(() => {
    if (currentURL[3] == "watch") {
      setInVideoPage(true);
    }
  }, []);

  return (
    <div className="App">
      <Navbar handleSideExpand={handleSideExpand} />
      <SidebarExpand sideExpand={sideExpand} />
      <SidebarMini
        sideExpand={sideExpand}
        inSearchPage={inSearchPage}
        inVideoPage={inVideoPage}
      />
      <PageContainer
        id="main"
        inSearchPage={inSearchPage}
        inVideoPage={inVideoPage}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/channel/*"
            element={<Channel sideExpand={sideExpand} />}
          />
          <Route
            path="/results"
            element={<SearchPage setInSearchPage={setInSearchPage} />}
          />
          <Route
            path="/watch"
            element={
              <VideoPage
                setInVideoPage={setInVideoPage}
                inVideoPage={inVideoPage}
              />
            }
          />
        </Routes>
      </PageContainer>
    </div>
  );
}

export default App;
