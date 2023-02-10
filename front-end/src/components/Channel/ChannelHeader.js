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

export const ChannelHeader = (props) => {
  const { sideExpand } = props;

  return (
    <ChannelHeaderExternal>
      <ChannelHeaderMiddle sideExpand={sideExpand}>
        <ChannelHeaderInner direction="row">
          <ChannelIcon />
          <InnerContainer direction="row">
            <InfoContainer>
              <NameContainer direction="row">
                <Name>Channel_Name</Name>
                <Verified>
                  <CheckCircleIcon
                    sx={{ color: "white", width: "14px", height: "14px" }}
                  />
                </Verified>
              </NameContainer>
              <Tag>@Tag</Tag>
              <Tag>1.0M Subscribers</Tag>
            </InfoContainer>
            <BtnContainer>
              <JoinSubBtn variant="contained">Join</JoinSubBtn>
              <JoinSubBtn variant="contained">Subscribe</JoinSubBtn>
            </BtnContainer>
          </InnerContainer>
        </ChannelHeaderInner>
      </ChannelHeaderMiddle>
    </ChannelHeaderExternal>
  );
};
