import { Navbar } from "./components/Appbar/Navbar";
import { ChannelBanner } from "./components/ChannelBanner";
import { ChannelHeader } from "./components/ChannelHeader";
import { Sidebar } from "./components/Sidebar";
import { ChannelNavBar } from "./components/ChannelNavBar";
import Banner from "./images/YouTube-banner.png";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      {Banner && <ChannelBanner banner={Banner} />}
      <ChannelHeader />
      <ChannelNavBar />
    </div>
  );
}

export default App;
