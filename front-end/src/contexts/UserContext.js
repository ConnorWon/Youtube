import { createContext, useState } from "react";

// UserContext
export const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  loggedChannel: null,
  setLoggedChannel: () => {},
  channels: [],
  setChannels: () => {},
  resetContext: () => {},
});

// UserContextProvider component
export function UserContextProvider(props) {
  // Hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loggedChannel, setLoggedChannel] = useState(null);
  const [channels, setChannels] = useState([]);

  // Resets context values
  const resetContext = () => {
    setIsLoggedIn(false);
    setUser(null);
    setLoggedChannel(null);
    setChannels([]);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loggedChannel,
        setLoggedChannel,
        channels,
        setChannels,
        resetContext,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
