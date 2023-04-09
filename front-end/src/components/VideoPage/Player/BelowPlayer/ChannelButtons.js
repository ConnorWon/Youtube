import React, { useEffect, useState, useRef } from "react";
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
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { colors } from "../../../ColorThemes";

const ChannelButtonsContainer = styled(Stack)`
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
  justify-content: flex-end;
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

const ButtonText = styled(Typography)`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  white-space: nowrap;
`;

const MenuButtonContainer = styled("div")``;

const MenuButton = styled(Button)`
  margin-left: 8px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  height: 36px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-transform: none;
  padding: 0 16px;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 0;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

const FlexibleButtons = styled("div")``;

export const ChannelButtons = () => {
  const [like, setLike] = useState();
  const [flexBtnShow, setFlexBtnShow] = useState(false);

  // adding responsiveness to buttons
  const resizer = useRef(0);
  var rightSide = null;
  var main = null;
  var download = useRef(null);
  var clip = useRef(null);
  var save = useRef(null);

  // const monitorResize = () => {
  //   // const left = leftSide.getBoundingClientRect();
  //   const right = rightSide.getBoundingClientRect();
  //   if (mainSize) {
  //     if (flexElNum == 0) {
  //       main.style.display = "block";
  //       download.current.style.display = "inline-block";
  //       clip.current.style.display = "inline-block";
  //       save.current.style.display = "inline-block";
  //     } else {
  //       const flexEl = flexibleElements[flexElNum][0];
  //       flexEl.current.style.display = "none";
  //       flexElNum--;
  //     }
  //   } else {
  //     if (right.left - left.right > flexibleElements[flexElNum][1]) {
  //       const flexEl = flexibleElements[flexElNum][0];
  //       flexEl.current.style.display = "inline-block";
  //       flexElNum++;
  //     } else if (main.getBoundingClientRect().width >= 640 && flexElNum == 3) {
  //       main.style.display = "flex";
  //     }
  //   }
  // };

  const handleFlexButtons = () => {
    const mainSize = main.getBoundingClientRect().width;
    if (mainSize >= 641) {
      main.style.display = "flex";
      rightSide.style.justifyContent = "flex-end";
      download.current.style.display = "none";
      clip.current.style.display = "none";
      save.current.style.display = "none";
      if (mainSize / 2 - 6 >= 403.5) {
        download.current.style.display = "inline-block";
        if (mainSize / 2 - 6 >= 491.78) {
          clip.current.style.display = "inline-block";
          if (mainSize / 2 - 6 >= 586) {
            save.current.style.display = "inline-block";
          }
        }
      }
    } else if (mainSize < 641) {
      main.style.display = "block";
      rightSide.style.justifyContent = "flex-start";
      download.current.style.display = "inline-block";
      clip.current.style.display = "none";
      save.current.style.display = "none";
      if (mainSize >= 492) {
        clip.current.style.display = "inline-block";
        if (mainSize >= 586) {
          save.current.style.display = "inline-block";
        }
      }
    }
  };

  useEffect(() => {
    main = document.getElementById("channelbtncont");
    resizer.current = new ResizeObserver(handleFlexButtons);
    resizer.current.observe(main);
    rightSide = document.getElementById("right-side");
    download.current = document.getElementById("download");
    clip.current = document.getElementById("clip");
    save.current = document.getElementById("save");
    handleFlexButtons();
    // monitorResize();
  }, []);

  return (
    <ChannelButtonsContainer id="channelbtncont" direction="row">
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
          <Menu id="right-side" direction="row">
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
                  <ButtonText>33K</ButtonText>
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
              <MenuButtonContainer>
                <MenuButton>
                  <IosShareOutlinedIcon className="Menu-button" />
                  <ButtonText>Share</ButtonText>
                </MenuButton>
              </MenuButtonContainer>
            </NonFlexButtons>
            <FlexibleButtons>
              <MenuButtonContainer id="download" sx={{ display: "none" }}>
                <MenuButton>
                  <DownloadOutlinedIcon className="Menu-button" />
                  <ButtonText>Download</ButtonText>
                </MenuButton>
              </MenuButtonContainer>
              <MenuButtonContainer id="clip" sx={{ display: "none" }}>
                <MenuButton>
                  <ContentCutOutlinedIcon className="Menu-button" />
                  <ButtonText>Clip</ButtonText>
                </MenuButton>
              </MenuButtonContainer>
              <MenuButtonContainer id="save" sx={{ display: "none" }}>
                <MenuButton>
                  <BookmarkAddOutlinedIcon className="Menu-button" />
                  <ButtonText>Save</ButtonText>
                </MenuButton>
              </MenuButtonContainer>
            </FlexibleButtons>
            <MenuButtonContainer>
              <MenuButton sx={{ p: 0, width: "36px" }}>
                <MoreHorizIcon
                  className="Menu-button"
                  style={{ marginRight: 0, marginLeft: 0 }}
                />
              </MenuButton>
            </MenuButtonContainer>
          </Menu>
        </ActionInner>
      </ActionButtons>
    </ChannelButtonsContainer>
  );
};
