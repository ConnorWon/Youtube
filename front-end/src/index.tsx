import "./index.css";
import App from "./App";
import { UserContextProvider } from "./contexts/UserContext";
import { SidebarContextProvider } from "./contexts/SidebarContext";
import ReactDOM from "react-dom";

ReactDOM.render(
    <UserContextProvider>
        <SidebarContextProvider>
            <App />
        </SidebarContextProvider>
    </UserContextProvider>,
    document.getElementById("root")
);