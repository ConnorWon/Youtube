import { useContext } from "react";
import {
  ChannelHeaderExternal,
  ChannelHeaderMiddle,
  ChannelHeaderInner,
  ChannelIcon,
  InnerContainer,
  InfoContainer,
  NameContainer,
  Name,
  Verified,
  Tag,
  BtnContainer,
  JoinSubBtn,
} from "./Styling";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ViewedChannelContext } from "../../contexts/ViewedChannelContext";
import { subToChannel, unsubFromChannel } from "../../utils/apiRequests";

export const ChannelHeader = (props) => {
  const { sideExpand, isSubbed, setIsSubbed, tag } = props;
  const { viewedChannel } = useContext(ViewedChannelContext);

  const handleSubToChannel = async () => {
    let subToResponse;
    if (!isSubbed) {
      subToResponse = await subToChannel(tag);
    } else {
      subToResponse = await unsubFromChannel(tag);
    }

    if (subToResponse.status === 204) {
      setIsSubbed(!isSubbed);
      // TODO: change this to calling an api endpoint that updates loggedChannel subscriptions
      window.location.reload();
    } else {
      console.log("An error occured while trying to sub you to this channel");
    }
  };

  return (
    <ChannelHeaderExternal>
      <ChannelHeaderMiddle sideExpand={sideExpand}>
        <ChannelHeaderInner direction="row">
          <ChannelIcon />
          <InnerContainer direction="row">
            <InfoContainer>
              <NameContainer direction="row">
                <Name>{viewedChannel.data.name}</Name>
                <Verified>
                  <CheckCircleIcon
                    sx={{ color: "white", width: "14px", height: "14px" }}
                  />
                </Verified>
              </NameContainer>
              <Tag>{viewedChannel.data.tag}</Tag>
              <Tag>{viewedChannel.data.sub_count} Subscribers</Tag>
            </InfoContainer>
            {isSubbed !== null && (
              <BtnContainer>
                <JoinSubBtn
                  variant="contained"
                  isSubbed={isSubbed}
                  onClick={handleSubToChannel}
                >
                  {isSubbed ? "Subscribed" : "Subscribe"}
                </JoinSubBtn>
              </BtnContainer>
            )}
          </InnerContainer>
        </ChannelHeaderInner>
      </ChannelHeaderMiddle>
    </ChannelHeaderExternal>
  );
};
