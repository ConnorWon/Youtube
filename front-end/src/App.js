import { Navbar } from "./components/Navigation/Navbar";
import { SidebarMini } from "./components/Navigation/SidebarMini";
import { Channel } from "./components/Channel/Channel";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Box, styled } from "@mui/material";
import { SidebarExpand } from "./components/Navigation/SidebarExpand";
import { useState } from "react";

function App() {
  const PageContainer = styled(Box)`
    width: ${({ sideExpand }) =>
      sideExpand ? "calc(100% - 240px)" : "calc(100% - 72px)"};
    height: calc(100% - 56px);
    position: relative;
    margin-top: 56px;
    margin-left: ${({ sideExpand }) => (sideExpand ? "240px" : "72px")};
    overflow-x: clip;
    max-width: 100%;
  `;

  const [sideExpand, setSideExpand] = useState(false);

  return (
    <div className="App">
      <Navbar setSideExpand={setSideExpand} sideExpand={sideExpand} />
      {sideExpand ? <SidebarExpand /> : <SidebarMini />}
      <PageContainer sideExpand={sideExpand}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/channel/*"
            element={<Channel sideExpand={sideExpand} />}
          />
          <Route path="/results" element={<SearchPage />} />
        </Routes>
      </PageContainer>
    </div>
  );
}

export default App;
