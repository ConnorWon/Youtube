import {Dispatch, FC, SetStateAction, useContext} from "react";
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
import { UserContext } from "../../contexts/UserContext";
import {BACKEND_BASE_URL} from "../../utils/Constants";
import {subToChannel, unsubFromChannel, updateSubscriptionData} from "../../services/channelService";

interface ChannelHeaderProps {
  sideExpand: boolean,
  isSubbed: boolean | null,
  setIsSubbed: Dispatch<SetStateAction<boolean|null>>,
  tag: string
}

export const ChannelHeader: FC<ChannelHeaderProps> = (props) => {
  const { sideExpand, isSubbed, setIsSubbed, tag } = props;
  const { viewedChannel } = useContext(ViewedChannelContext);
  const { setLoggedChannel } = useContext(UserContext);

  const handleSubToChannel = async () => {
    let subToResponse;
    if (!isSubbed) {
      subToResponse = await subToChannel(tag);
    } else {
      subToResponse = await unsubFromChannel(tag);
    }

    if (subToResponse.status === 204) {
      setIsSubbed(!isSubbed);
      await updateLoggedChannelSubbedList();
    } else {
      console.log("An error occurred while trying to sub you to this channel");
    }
  };

  const updateLoggedChannelSubbedList = async () => {
    const response = await updateSubscriptionData();

    if (response.status === 200) {
      setLoggedChannel((prevState) => ({
        ...prevState!,
        subscriptions: response.data,
      }));
    } else {
      console.log(
        "An error occurred while trying to update your subscription list"
      );
    }
  };

  return (
    <ChannelHeaderExternal>
      <ChannelHeaderMiddle sideExpand={sideExpand}>
        <ChannelHeaderInner direction="row">
          <ChannelIcon src={BACKEND_BASE_URL + viewedChannel!.profile_pic}/>
          <InnerContainer direction="row">
            <InfoContainer>
              <NameContainer direction="row">
                <Name>{viewedChannel!.name}</Name>
                <Verified>
                  <CheckCircleIcon
                    sx={{ color: "white", width: "14px", height: "14px" }}
                  />
                </Verified>
              </NameContainer>
              <Tag>{viewedChannel!.tag}</Tag>
              <Tag>{viewedChannel!.sub_count} Subscribers</Tag>
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
