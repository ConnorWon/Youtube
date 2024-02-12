import React, { useEffect, useState, useRef } from "react";
import { ToggleButtonGroup } from "@mui/material";
import {
  ChannelButtonsContainer,
  ChannelOwnerContainer,
  ChannelContainer,
  ChannelIcon,
  ChannelIconContainer,
  OwnerInfoContainer,
  ChannelNameContainer,
  ChannelName,
  Verified,
  SubCount,
  JoinSubBtn,
  ActionButtons,
  ActionInner,
  BtnMenu,
  NonFlexButtons,
  LikeDislikeBtn,
  ButtonText,
  MenuButtonContainer,
  MenuButton,
  FlexibleButtons,
} from "./Styling";
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
import { colors } from "../../../../utils/ColorThemes";
import { useNavigate } from "react-router-dom";

export const ChannelButtons = () => {
  const navigate = useNavigate();

  // tracks state of like button
  const [like, setLike] = useState();

  // ref that holds the resizeObserver that observes the resizing of this component
  const resizer = useRef(0);

  // used to hold the menu component
  var menu = null;

  // used to hold the outer most parent element
  var main = null;

  // ref for download button
  var download = useRef(null);

  // ref for clip button
  var clip = useRef(null);

  // ref for save button
  var save = useRef(null);

  // handles hiding/making visible flex buttons
  const handleFlexButtons = () => {
    const mainSize = main.getBoundingClientRect().width;
    if (mainSize >= 641) {
      main.style.display = "flex";
      menu.style.justifyContent = "flex-end";
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
      menu.style.justifyContent = "flex-start";
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

  // setup to add responsiveness to button menu and flex buttons
  useEffect(() => {
    main = document.getElementById("channelbtncont");
    resizer.current = new ResizeObserver(handleFlexButtons);
    resizer.current.observe(main);
    menu = document.getElementById("menu");
    download.current = document.getElementById("download");
    clip.current = document.getElementById("clip");
    save.current = document.getElementById("save");
    handleFlexButtons();
  }, []);

  return (
    <ChannelButtonsContainer id="channelbtncont" direction="row">
      <ChannelOwnerContainer direction="row">
        <ChannelContainer direction="row">
          <ChannelIconContainer
            onClick={() => {
              navigate("/channel/@car");
            }}
          >
            <ChannelIcon />
          </ChannelIconContainer>
          <OwnerInfoContainer>
            <ChannelNameContainer
              direction="row"
              onClick={() => {
                navigate("/channel/@car");
              }}
            >
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
          <BtnMenu id="menu" direction="row">
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
          </BtnMenu>
        </ActionInner>
      </ActionButtons>
    </ChannelButtonsContainer>
  );
};
