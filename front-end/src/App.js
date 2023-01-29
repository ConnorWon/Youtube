import { Navbar } from "./components/Navigation/Navbar";
import { Sidebar } from "./components/Navigation/Sidebar";
import { Channel } from "./components/Channel/Channel";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Box, styled } from "@mui/material";
import { colors } from "./components/ColorThemes";

function App() {
  const PageContainer = styled(Box)`
    width: calc(100% - 72px);
    height: calc(100% - 56px);
    position: relative;
    margin-top: 56px;
    margin-left: 72px;
    overflow-x: clip;
    max-width: 100%;
  `;

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channel" element={<Channel />} />
        </Routes>
      </PageContainer>
    </div>
  );
}

export default App;
