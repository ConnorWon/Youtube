import {
  CommentThread,
  CommentBody,
  AuthorAvatarContainer,
  AuthorAvatar,
  BodyMain,
  AuthorContainer,
  AuthorDate,
  CommentContentContainer,
  CommentContentInnerContainer,
  CommentContent,
  ReadMoreBtn,
  CommentButtonsContainer,
  LikeDislikeBtn,
  LikeNum,
  ReplyBtn,
  ActionMenu,
  ActionMenuContainer,
  ActionMenuBtn,
  ActionMenuItem,
  ActionMenuItemText,
  RepliesBtnText,
  RepliesButton,
  RepliesContainer,
  AuthorText,
} from "./Styling";
import React, { useState, useEffect } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export const Comment = (props) => {
  // prop that is true if the comment is a reply of another comment
  const { reply } = props;

  // for expanding comment content
  const [expandText, setExpandText] = useState(false);
  const [readMoreBtn, setReadMoreBtn] = useState(false);
  // on initial component load determines if comment overflows or not
  useEffect(() => {
    const el = document.getElementById("1");
    const overflown = el.scrollHeight > el.clientHeight;
    if (overflown) {
      setReadMoreBtn(true);
    }
  }, []);

  // for clicking like/dislike button
  const [like, setLike] = useState("");
  const handleLike = (val) => {
    if (like === val) {
      setLike("");
    } else {
      setLike(val);
    }
  };

  // for opening action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const openActionMenu = Boolean(actionMenuAnchor);
  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
  };

  // expanding replies
  const [openReplies, setOpenReplies] = useState(false);

  return (
    <CommentThread>
      <CommentBody direction="row" reply={reply}>
        <AuthorAvatarContainer>
          <AuthorAvatar reply={reply} />
        </AuthorAvatarContainer>
        <BodyMain>
          <AuthorContainer direction="row">
            <AuthorText>@amperscore</AuthorText>
            <AuthorDate>2 weeks ago</AuthorDate>
          </AuthorContainer>
          <CommentContentContainer>
            <CommentContentInnerContainer expandText={expandText}>
              {/* id can be author of thread + num */}
              <CommentContent id="1">
                When I went to Japan for a student exchange trip, I already knew
                some Japanese from my high school classes but still kinda sucked
                with it. The best thing that helped me communicate was my host
              </CommentContent>
              {readMoreBtn && (
                <ReadMoreBtn onClick={() => setExpandText(!expandText)}>
                  {!expandText ? "Read more" : "Show less"}
                </ReadMoreBtn>
              )}
            </CommentContentInnerContainer>
          </CommentContentContainer>
          <CommentButtonsContainer direction="row">
            <LikeDislikeBtn sx={{ ml: "-6px" }} onClick={() => handleLike(1)}>
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
          <ActionMenuBtn onClick={(e) => setActionMenuAnchor(e.currentTarget)}>
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
      {reply == null && (
        <RepliesContainer reply={reply}>
          <RepliesButton onClick={() => setOpenReplies(!openReplies)}>
            {openReplies ? (
              <ArrowDropUpIcon
                sx={{ width: "24px", height: "24px", mr: "6px", ml: "-6px" }}
              />
            ) : (
              <ArrowDropDownIcon
                sx={{ width: "24px", height: "24px", mr: "6px", ml: "-6px" }}
              />
            )}
            <RepliesBtnText>12 replies</RepliesBtnText>
          </RepliesButton>
          {openReplies && <Comment reply="true" />}
        </RepliesContainer>
      )}
    </CommentThread>
  );
};
