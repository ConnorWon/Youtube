import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {loginValidatedUser} from "../services/authService";
import {getUserChannels, setDefaultChannel} from "../services/channelService";

// AutoLogin component
export function AutoLogin() {
  // Hooks
  const { setIsLoggedIn, setLoggedChannel, setChannels } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Logs a user in if they have a valid session
  const login = async () => {
    const loginResponse = await loginValidatedUser();
    if (loginResponse.status !== 200) {
      setIsLoading(false);
      return;
    }
    setIsLoggedIn(true);

    const channelResponse = await setDefaultChannel();
    if (channelResponse.status === 200) {
      setLoggedChannel(channelResponse.data);
    }

    const channelList = await getUserChannels();
    setChannels(channelList);

    // If user going to log in url, and they already have login credentials,
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
