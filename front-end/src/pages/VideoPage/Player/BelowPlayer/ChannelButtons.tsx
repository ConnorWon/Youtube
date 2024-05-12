import { useEffect, useState, useRef } from "react";
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
  const [like, setLike] = useState<string>('');

  // ref that holds the resizeObserver that observes the resizing of this component
  const resizer = useRef<ResizeObserver>();

  // ref for menu component
  let menu = useRef<HTMLDivElement>(null);

  // ref for the outermost containing element
  let main = useRef<HTMLDivElement>(null);

  // ref for div containing download button
  let download = useRef<HTMLDivElement>(null);

  // ref for div containing clip button
  let clip = useRef<HTMLDivElement>(null);

  // ref for div containing save button
  let save = useRef<HTMLDivElement>(null);

  // handles hiding/making visible flex buttons
  const handleFlexButtons = () => {
    const mainSize = main.current!.getBoundingClientRect().width;
    if (mainSize >= 641) {
      main.current!.style.display = "flex";
      menu.current!.style.justifyContent = "flex-end";
      download.current!.style.display = "none";
      clip.current!.style.display = "none";
      save.current!.style.display = "none";
      if (mainSize / 2 - 6 >= 403.5) {
        download.current!.style.display = "inline-block";
        if (mainSize / 2 - 6 >= 491.78) {
          clip.current!.style.display = "inline-block";
          if (mainSize / 2 - 6 >= 586) {
            save.current!.style.display = "inline-block";
          }
        }
      }
    } else if (mainSize < 641) {
      main.current!.style.display = "block";
      menu.current!.style.justifyContent = "flex-start";
      download.current!.style.display = "inline-block";
      clip.current!.style.display = "none";
      save.current!.style.display = "none";
      if (mainSize >= 492) {
        clip.current!.style.display = "inline-block";
        if (mainSize >= 586) {
          save.current!.style.display = "inline-block";
        }
      }
    }
  };

  // setup to add responsiveness to button menu and flex buttons
  useEffect(() => {
    resizer.current = new ResizeObserver(handleFlexButtons);
    resizer.current.observe(main.current!);
    handleFlexButtons();
  }, []);

  return (
    <ChannelButtonsContainer ref={main} direction="row">
      <ChannelOwnerContainer direction="row">
        <ChannelContainer direction="row">
          <ChannelIconContainer
            onClick={() => {
              navigate("/channel/@car");  // TODO: update once videos are specific to channel
            }}
          >
            <ChannelIcon />
          </ChannelIconContainer>
          <OwnerInfoContainer>
            <ChannelNameContainer
              direction="row"
              onClick={() => {
                navigate("/channel/@car");  // TODO: update once videos are specific to channel
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
          <BtnMenu ref={menu} direction="row">
            <NonFlexButtons direction="row">
              <ToggleButtonGroup
                value={like}
                exclusive
                onChange={(_event, newValue) => setLike(newValue)}
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
              <MenuButtonContainer ref={download} sx={{ display: "none" }}>
                <MenuButton>
                  <DownloadOutlinedIcon className="Menu-button" />
                  <ButtonText>Download</ButtonText>
                </MenuButton>
              </MenuButtonContainer>
              <MenuButtonContainer ref={clip} sx={{ display: "none" }}>
                <MenuButton>
                  <ContentCutOutlinedIcon className="Menu-button" />
                  <ButtonText>Clip</ButtonText>
                </MenuButton>
              </MenuButtonContainer>
              <MenuButtonContainer ref={save} sx={{ display: "none" }}>
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
