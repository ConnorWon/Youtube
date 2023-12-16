import { createContext, useState } from "react";

export const ViewedChannelContext = createContext({
  viewedChannel: null,
  setViewedChannel: () => {},
});

export function ViewedChannelContextProvider(props) {
  // Hooks
  const [viewedChannel, setViewedChannel] = useState(null);

  return (
    <ViewedChannelContext.Provider
      value={{
        viewedChannel,
        setViewedChannel,
      }}
    >
      {props.children}
    </ViewedChannelContext.Provider>
  );
}
