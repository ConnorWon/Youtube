import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  setDefaultChannel,
  userIsLogged,
  getUserChannels,
} from "./apiRequests";

// AutoLogin component
export function AutoLogin() {
  // Hooks
  const { setIsLoggedIn, setUser, setLoggedChannel, setChannels } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Logs a user in if they have a valid session
  const login = async () => {
    const loginResponse = await userIsLogged();
    if (!loginResponse) {
      setIsLoading(false);
      return;
    }
    setUser(loginResponse.data["id"]);
    setIsLoggedIn(true);

    const channelResponse = await setDefaultChannel();
    if (channelResponse.status === 200) {
      setLoggedChannel(channelResponse.data);
    } else {
      console.log(channelResponse.status);
    }

    const channelList = await getUserChannels();
    if (channelList) {
      setChannels(channelList);
    } else {
      console.log(channelList.message);
    }

    // If user going to login url and they already have login credentials,
    // will redirect user to home page
    if (window.location.href.includes("login")) {
      navigate("/");
    }

    setIsLoading(false);
  };

  // Tries to log a user in
  useEffect(() => {
    login();
  }, []);

  return <>{isLoading ? null : <Outlet />}</>;
}
