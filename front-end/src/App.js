import { SearchPage } from "./pages/SearchPage/SearchPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { useLayoutEffect, useEffect, useContext } from "react";
import { VideoPage } from "./pages/VideoPage/VideoPage";
import { GetWindowDimension } from "./utils/WindowSizeStore";
import { SidebarContext } from "./contexts/SidebarContext";
import Navigation from "./pages/Navigation";
import { AutoLogin } from "./utils/AutoLogin";
import ContentContainer from "./components/ContentContainer";
import { Login } from "./pages/Auth/Login/Login";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import { PrepChannelData } from "./pages/Channel/PrepChannelData";
import { UserInfoDashboardManager } from "./pages/UserInfoManager/UserInfoDashboardManager";
import { ChannelCreation } from "./pages/Auth/ChannelCreation/ChannelCreation";
import { ChannelManagerIndex } from "./pages/ChannelManger/ChannelManagerIndex";

function App() {
  // Sidebar related states
  const { sideExpand, noMiniSideBar, setNoMiniSideBar, setModalSideExpand } =
    useContext(SidebarContext);

  // used for tracking window size
  const windowSize = GetWindowDimension();

  // ensures page layout is proper for when going to videoPage from outside YouTube
  var currentURL = window.location.href.split("/");
  useLayoutEffect(() => {
    if (currentURL[3] === "watch") {
      setNoMiniSideBar(true);
    }
  }, []);

  // resets modalSideExpand upon reaching max window size for the modal sidebar
  useEffect(() => {
    if (windowSize > 1312 && !noMiniSideBar) {
      setModalSideExpand(false);
    }
  }, [windowSize, sideExpand, noMiniSideBar]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AutoLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create_channel" element={<ChannelCreation />} />
        <Route path="/channel_dashboard/*" element={<ChannelManagerIndex />} />
        <Route element={<Navigation />}>
          <Route element={<ContentContainer />}>
            <Route path="/" element={<Home />} />
            <Route path="/channel/:tag/*" element={<PrepChannelData />} />
            <Route path="/results" element={<SearchPage />} />
            <Route path="/watch" element={<VideoPage />} />
            <Route path="/account/*" element={<UserInfoDashboardManager />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
