import { Navbar } from "./components/Appbar/Navbar";
import { ChannelBanner } from "./components/ChannelBanner";
import { ChannelHeader } from "./components/ChannelHeader";
import { Sidebar } from "./components/Sidebar";
import Banner from "./images/YouTube-banner.png";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      {Banner && <ChannelBanner banner={Banner} />}
      <ChannelHeader />
    </div>
  );
}

export default App;
