import { useContext, useEffect, useState } from "react";
import { ChannelBanner } from "./ChannelBanner";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelNavBar } from "./ChannelNavBar";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ViewedChannelContext } from "../../contexts/ViewedChannelContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {getChannelInfo, isSubbedTo} from "../../services/channelService";

export const Channel = () => {
  const { sideExpand, setModalSideExpand } = useContext(SidebarContext);
  const { viewedChannel, setViewedChannel } = useContext(ViewedChannelContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubbed, setIsSubbed] = useState<boolean|null>(null);
  const [tag, setTag] = useState<string>(window.location.href.split("/")[4]!);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (window.location.href.split("/")[4] !== tag) {
      setIsLoading(true);
      setTag(window.location.href.split("/")[4]!);
    }
  }, [location.pathname]);

  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  const getChannelData = async () => {
    const channelDataResponse = await getChannelInfo(tag);
    if (channelDataResponse.status === 200) {
      setViewedChannel(channelDataResponse.data);
    } else {
      // TODO: convert to some sort of component that shows this better
      alert("Channel does not exist");
      navigate("/");
    }
    setIsLoading(false);
  };

  const getIsSubbed = async () => {
    const isSubbedToResponse = await isSubbedTo(tag);
    if (isSubbedToResponse.status === 200) {
      setIsSubbed(isSubbedToResponse.data);
    } else if (isSubbedToResponse.status === 400) {
      setIsSubbed(null);
    } else {
      console.log(
        "An error occurred while checking to see if your subbed to this channel"
      );
    }
  };

  useEffect(() => {
    getChannelData();
    getIsSubbed();
  }, [tag]);


  return isLoading ? (
    <CircularProgress
      sx={{
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <>
      {viewedChannel!.banner && (
        <ChannelBanner
          banner={viewedChannel!.banner}
          sideExpand={sideExpand}
        />
      )}
      <ChannelHeader
        sideExpand={sideExpand}
        isSubbed={isSubbed}
        setIsSubbed={setIsSubbed}
        tag={tag}
      />
      <ChannelNavBar sideExpand={sideExpand} tag={tag} />
    </>
  );
};
