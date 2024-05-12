import {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from "react";
import {ChannelData} from "../types/types";

interface ViewedChannelContextStructure {
    viewedChannel: ChannelData | null,
    setViewedChannel: Dispatch<SetStateAction<ChannelData|null>>,
}

export const ViewedChannelContext = createContext<ViewedChannelContextStructure>({
  viewedChannel: null,
  setViewedChannel: () => {},
});

export const ViewedChannelContextProvider: FC<{children: ReactNode}> = ({children}) => {
  // Hooks
  const [viewedChannel, setViewedChannel] = useState<ChannelData|null>(null);

  return (
    <ViewedChannelContext.Provider
      value={{
        viewedChannel,
        setViewedChannel,
      }}
    >
      {children}
    </ViewedChannelContext.Provider>
  );
}
