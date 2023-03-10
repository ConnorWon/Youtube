import {
  Typography,
  Stack,
  styled,
  Menu,
  MenuItem,
  Avatar,
  Button,
  FormControl,
  Input,
  createTheme,
  ThemeProvider,
  Collapse,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../ColorThemes";
import SortIcon from "@mui/icons-material/Sort";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const BaseContainer = styled("div")``;

const MainContainer = styled(Stack)`
  margin-top: 24px;
  margin-bottom: 32px;
`;

const HeaderContainer = styled(Stack)`
  margin-bottom: 24px;
  align-items: center;
`;

const CommentCount = styled(Typography)`
  vertical-align: middle;
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: ${colors.textWhite};
  margin-right: 32px;
`;

const SortButton = styled(Stack)`
  cursor: pointer;
  align-items: center;
`;

const SortText = styled(Typography)`
  color: ${colors.textWhite};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const SortMenu = styled(Menu)`
  margin-top: 10px;
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    background-color: ${colors.dropDownMenu};
  }
`;

const SortMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 300;
  padding: 12px 16px;
  font-size: 14px;
`;

const CommentContainer = styled(Stack)`
  margin-right: 16px;
  flex-wrap: wrap;
  flex-direction: row;
`;

const UserIcon = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 50%;
`;

const CommentBox = styled("div")`
  flex: 1;
  flex-basis: 1e-9px;
  min-width: 0;
`;

const CommentFormControl = styled(FormControl)`
  width: 100%;
`;

const CommentInput = styled(Input)``;

const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          color: colors.textGrey,
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid white",
          },
          "&:after": {
            borderBottom: `2px solid white`,
          },
          "&:hover:before": {
            borderBottom: `1px solid white !important`,
          },
        },
      },
    },
  },
});

const BelowCommentField = styled(Stack)`
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Emojis = styled(InsertEmoticonIcon)`
  color: ${colors.textWhite};
  cursor: pointer;
`;

const Spacer = styled(Stack)`
  flex-grow: 1;
`;

const CommentButton = styled(Button)`
  background-color: transparent;
  min-width: 0;
  border-radius: 18px;
  margin-left: 8px;
  color: ${colors.textWhite};
  text-transform: none;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  font-weight: 500;
  :hover {
    background-color: ${colors.borderColor};
  }
`;

const Contents = styled("div")``;

const CommentThread = styled("div")`
  margin-bottom: 16px;
`;

const CommentBody = styled(Stack)`
  border-radius: 4px;
  position: relative;
`;

const AuthorAvatarContainer = styled("div")``;

const AuthorAvatar = styled(Avatar)`
  margin-right: 16px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const BodyMain = styled(Stack)`
  min-width: 0;
  flex: 1;
  flex-basis: 1e-9px;
`;

const AuthorContainer = styled(Stack)`
  margin-bottom: 2px;
  align-items: baseline;
`;

const AuthorText = styled(Typography)`
  color: ${colors.textWhite};
  margin-right: 4px;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
`;

const AuthorDate = styled(Typography)`
  color: ${colors.textGrey};
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

const CommentContentContainer = styled("div")`
  display: inline-flex;
  width: 100%;
`;

const CommentContentInnerContainer = styled("div")`
  overflow: auto;
  width: 100%;
  --max-lines: ${({ expandText }) => (expandText ? "none" : "4")};
`;

const CommentContent = styled(Typography)`
  color: ${colors.textWhite};
  overflow: hidden;
  max-height: none;
  -webkit-line-clamp: var(--max-lines);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const ReadMoreBtn = styled("div")`
  margin-top: 4px;
  user-select: none;
  cursor: pointer;
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;
  word-wrap: break-word;
  min-width: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${colors.textGrey};
`;

const CommentButtonsContainer = styled(Stack)`
  margin-top: 4px;
  min-height: 16px;
  align-items: center;
`;

const LikeDislikeBtn = styled(Button)`
  color: ${colors.textWhite};
  width: 32px;
  height: 32px;
  min-width: 0;
  padding: 0;
  border-radius: 50%;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

const LikeNum = styled("span")`
  margin-right: 8px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.textGrey};
  font-family: Roboto;
`;

const ReplyBtn = styled(Button)`
  min-width: 0;
  margin-left: 8px;
  color: ${colors.textWhite};
  font-size: 12px;
  line-height: 32px;
  font-weight: 500;
  border-radius: 16px;
  padding: 0 12px;
  height: 32px;
  text-transform: none;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

const ActionMenuContainer = styled("div")``;

const ActionMenuBtn = styled(IconButton)`
  color: ${colors.textWhite};
  :hover {
    background-color: unset;
  }
`;

const ActionMenu = styled(Menu)`
  margin-top: 10px;
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    background-color: ${colors.dropDownMenu};
  }
`;

const ActionMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 300;
  font-size: 14px;
  padding: 0 12px 0 16px;
  height: 36px;
`;

const ActionMenuItemText = styled("span")`
  margin-right: 24px;
`;

export const CommentSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expand, setExpand] = useState(false);
  const [fieldVal, setFieldVal] = useState("");

  const handleCancel = () => {
    setFieldVal("");
    setExpand(false);
  };

  const [expandText, setExpandText] = useState(false);
  const [like, setLike] = useState("");

  const handleLike = (val) => {
    if (like === val) {
      setLike("");
    } else {
      setLike(val);
    }
  };

  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const openActionMenu = Boolean(actionMenuAnchor);
  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
  };

  return (
    <BaseContainer>
      <MainContainer>
        <HeaderContainer direction="row">
          <CommentCount>650 Comments</CommentCount>
          <SortButton direction="row" onClick={handleClick}>
            <SortIcon sx={{ mr: "8px", color: colors.textWhite }} />
            <SortText>Sort By</SortText>
          </SortButton>
          <SortMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <SortMenuItem onClick={handleClose}>Top comments</SortMenuItem>
            <SortMenuItem onClick={handleClose}>Newest first</SortMenuItem>
          </SortMenu>
        </HeaderContainer>
        <CommentContainer>
          <UserIcon />
          <CommentBox>
            <CommentFormControl variant="standard">
              <ThemeProvider theme={theme}>
                <CommentInput
                  placeholder="Add a comment..."
                  onFocus={() => setExpand(true)}
                  value={fieldVal}
                  onChange={(e) => setFieldVal(e.target.value)}
                />
              </ThemeProvider>
            </CommentFormControl>
            <Collapse in={expand} timeout="auto">
              <BelowCommentField direction="row">
                <Emojis />
                <Spacer />
                <CommentButton onClick={handleCancel}>Cancel</CommentButton>
                <CommentButton
                  sx={{
                    ":disabled": {
                      color: "rgba(255, 255, 255, 0.3)",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                    backgroundColor: "rgb(92,164,248)",
                    color: colors.bgColorDark,
                    ":hover": {
                      bgcolor: "rgb(121, 182, 249)",
                    },
                  }}
                  disabled={fieldVal === ""}
                >
                  Comment
                </CommentButton>
              </BelowCommentField>
            </Collapse>
          </CommentBox>
        </CommentContainer>
      </MainContainer>
      <Contents>
        <CommentThread>
          <CommentBody direction="row">
            <AuthorAvatarContainer>
              <AuthorAvatar />
            </AuthorAvatarContainer>
            <BodyMain>
              <AuthorContainer direction="row">
                <AuthorText>@amperscore</AuthorText>
                <AuthorDate>2 weeks ago</AuthorDate>
              </AuthorContainer>
              <CommentContentContainer>
                <CommentContentInnerContainer expandText={expandText}>
                  <CommentContent>
                    When I went to Japan for a student exchange trip, I already
                    knew some Japanese from my high school classes but still
                    kinda sucked with it. The best thing that helped me
                    communicate was my host family's Pocketalk which is just a
                    very easy to use translator. It allowed me to have deeper
                    conversations with Japanese people despite the language
                    barrier and really improved my trip. I would highly suggest
                    getting one to anyone who is planning on going!
                  </CommentContent>
                  <ReadMoreBtn onClick={() => setExpandText(!expandText)}>
                    {!expandText ? "Read more" : "Show less"}
                  </ReadMoreBtn>
                </CommentContentInnerContainer>
              </CommentContentContainer>
              <CommentButtonsContainer direction="row">
                <LikeDislikeBtn
                  sx={{ ml: "-6px" }}
                  onClick={() => handleLike(1)}
                >
                  {like === 1 ? (
                    <ThumbUpAltIcon sx={{ width: "20px", height: "20px" }} />
                  ) : (
                    <ThumbUpAltOutlinedIcon
                      sx={{ width: "20px", height: "20px" }}
                    />
                  )}
                </LikeDislikeBtn>
                <LikeNum>240</LikeNum>
                <LikeDislikeBtn onClick={() => handleLike(2)}>
                  {like === 2 ? (
                    <ThumbDownIcon sx={{ width: "20px", height: "20px" }} />
                  ) : (
                    <ThumbDownAltOutlinedIcon
                      sx={{ width: "20px", height: "20px" }}
                    />
                  )}
                </LikeDislikeBtn>
                <ReplyBtn>Reply</ReplyBtn>
              </CommentButtonsContainer>
            </BodyMain>
            <ActionMenuContainer>
              <ActionMenuBtn
                onClick={(e) => setActionMenuAnchor(e.currentTarget)}
              >
                <MoreVertIcon sx={{ fontSize: "22px" }} />
              </ActionMenuBtn>
              <ActionMenu
                anchorEl={actionMenuAnchor}
                open={openActionMenu}
                onClose={handleCloseActionMenu}
              >
                <ActionMenuItem onClick={handleCloseActionMenu}>
                  <FlagOutlinedIcon
                    sx={{ width: "24px", height: "24px", mr: "16px" }}
                  />
                  <ActionMenuItemText>Report</ActionMenuItemText>
                </ActionMenuItem>
              </ActionMenu>
            </ActionMenuContainer>
          </CommentBody>
        </CommentThread>
      </Contents>
    </BaseContainer>
  );
};
