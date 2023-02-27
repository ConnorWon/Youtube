import React, { useState } from "react";
import {
  Avatar,
  styled,
  Typography,
  Stack,
  Link,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { colors } from "../../ColorThemes";

const MainContainer = styled("div")`
  position: relative;
`;

const VideoInfoContainer = styled("div")`
  margin-top: calc(--margin-size / 3);
  margin-bottom: --margin-size;
  color: #fff;
`;

const Title = styled(Typography)`
  word-break: break-word;
  font-family: Roboto;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  overflow: hidden;
  max-height: 56px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
`;

const ChannelButtonsContainer = styled("div")`
  margin-top: -4px;
`;

const ChannelOwnerContainer = styled(Stack)`
  min-width: calc(50% - 6px);
  align-items: center;
  box-sizing: border-box;
  margin-right: 12px;
  margin-top: 12px;
`;

const ChannelContainer = styled(Stack)`
  min-width: 0;
`;

const ChannelIconContainer = styled("a")`
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const ChannelIcon = styled(Avatar)`
  margin-right: 12px;
  width: 40px;
  height: 40px;
`;

const OwnerInfoContainer = styled(Stack)`
  justify-content: center;
  flex: 1;
  flex-basis: 1e-9px;
  overflow: hidden;
  margin-right: 24px;
`;

const ChannelNameContainer = styled(Stack)`
  z-index: 300;
  color: inherit;
  max-width: 100%;
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`;

const ChannelName = styled(Link)`
  word-wrap: none;
  word-break: none;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Verified = styled(Stack)`
  align-items: center;
  line-height: 12px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 2px;
  margin-bottom: 1px;
  padding-left: 4px;
  flex: none;
`;

const SubCount = styled(Typography)`
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  max-height: 18px;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  white-space: normal;
  color: ${colors.textGrey};
  margin-right: 4px;
`;

const JoinSubBtn = styled(Button)`
  border-radius: 20px;
  background-color: white;
  color: black;
  text-transform: none;
  font-weight: 500;
  margin-left: 8px;
  :hover {
    background-color: #dad9d9;
  }
`;

const ActionButtons = styled(Stack)`
  justify-content: flex-start;
  min-width: calc(50% - 6px);
  align-items: center;
  box-sizing: border-box;
  margin-top: 12px;
`;

const ActionInner = styled(Stack)`
  width: 100%;
`;

const Menu = styled(Stack)`
  justify-content: flex-start;
  width: 100%;
  overflow-y: hidden;
  flex-wrap: wrap;
  max-height: 40px;
  --yt-button-icon-size: 36px;
`;

const NonFlexButtons = styled(Stack)``;

const LikeDislikeBtn = styled(ToggleButton)`
  white-space: nowrap;
  min-width: 0;
  text-transform: none;
  font-family: Roboto;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline-width: 0;
  box-sizing: border-box;
  background: none;
  text-decoration: none;
  flex: 1;
  flex-basis: 1e-9px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px 0 0 18px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  :hover {
    background-color: ${colors.borderColor};
  }

  .Mui-selected {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LikeText = styled(Typography)`
  font-size: inherit;
  line-height: inherit;
  white-space: nowrap;
`;

export const BelowPlayer = () => {
  const [like, setLike] = useState();

  return (
    <MainContainer>
      <VideoInfoContainer>
        <div>
          <Title>Video Title</Title>
        </div>
        <ChannelButtonsContainer>
          <ChannelOwnerContainer direction="row">
            <ChannelContainer direction="row">
              <ChannelIconContainer>
                <ChannelIcon />
              </ChannelIconContainer>
              <OwnerInfoContainer>
                <ChannelNameContainer direction="row">
                  <ChannelName>Ludwig</ChannelName>
                  <Verified>
                    <CheckCircleIcon
                      sx={{
                        width: "14px",
                        height: "14px",
                        color: colors.textGrey,
                      }}
                    />
                  </Verified>
                </ChannelNameContainer>
                <SubCount>4.07M subscribers</SubCount>
              </OwnerInfoContainer>
            </ChannelContainer>
            <JoinSubBtn variant="contained">Subscribe</JoinSubBtn>
          </ChannelOwnerContainer>
          <ActionButtons direction="row">
            <ActionInner>
              <Menu direction="row">
                <NonFlexButtons direction="row">
                  <ToggleButtonGroup
                    value={like}
                    exclusive
                    onChange={(event, newValue) => setLike(newValue)}
                  >
                    <LikeDislikeBtn value="like" selected={false}>
                      {like === "like" ? (
                        <ThumbUpAltIcon
                          sx={{
                            mr: "6px",
                            ml: "-6px",
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      ) : (
                        <ThumbUpAltOutlinedIcon
                          sx={{
                            mr: "6px",
                            ml: "-6px",
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      )}
                      <LikeText>33K</LikeText>
                    </LikeDislikeBtn>
                    <LikeDislikeBtn
                      value="dislike"
                      selected={false}
                      sx={{
                        flex: "none",
                        borderRadius: "0 18px 18px 0",
                        p: "0 16px",
                        width: "52px",
                      }}
                    >
                      {like === "dislike" ? (
                        <ThumbDownIcon
                          sx={{
                            ml: "-6px",
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      ) : (
                        <ThumbDownOffAltIcon
                          sx={{
                            ml: "-6px",
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      )}
                    </LikeDislikeBtn>
                  </ToggleButtonGroup>
                </NonFlexButtons>
              </Menu>
            </ActionInner>
          </ActionButtons>
        </ChannelButtonsContainer>
      </VideoInfoContainer>
    </MainContainer>
  );
};
