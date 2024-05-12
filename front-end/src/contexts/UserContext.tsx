import {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from "react";
import {ChannelData, CondensedChannelData} from "../types/types";

interface UserContextStructure {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    loggedChannel: ChannelData | null,
    setLoggedChannel: Dispatch<SetStateAction<ChannelData|null>>,
    channels: CondensedChannelData[],
    setChannels: Dispatch<SetStateAction<CondensedChannelData[]>>,
    resetContext: () => void,
}

// UserContext
export const UserContext = createContext<UserContextStructure>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  loggedChannel: null,
  setLoggedChannel: () => {},
  channels: [],
  setChannels: () => {},
  resetContext: () => {},
});

// UserContextProvider component
export const UserContextProvider: FC<{children: ReactNode}> = ({children}) => {
  // Hooks
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedChannel, setLoggedChannel] = useState<ChannelData|null>(null);
  const [channels, setChannels] = useState<CondensedChannelData[]>([]);

  // Resets context values
  const resetContext = () => {
    setIsLoggedIn(false);
    setLoggedChannel(null);
    setChannels([]);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loggedChannel,
        setLoggedChannel,
        channels,
        setChannels,
        resetContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
