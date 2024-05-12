import { createTheme, ThemeProvider, Collapse } from "@mui/material";
import {
  BaseContainer,
  CSMainContainer,
  HeaderContainer,
  CommentCount,
  SortButton,
  SortText,
  SortMenu,
  SortMenuItem,
  CommentContainer,
  UserIcon,
  CommentBox,
  CommentFormControl,
  CommentInput,
  BelowCommentField,
  Emojis,
  Spacer,
  CommentButton,
  Contents,
} from "./Styling";
import { useState, MouseEvent } from "react";
import { colors } from "../../../../../utils/ColorThemes";
import SortIcon from "@mui/icons-material/Sort";
import { Comment } from "./Comment";

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

export const CommentSection = () => {
  // anchor element for modal sort menu
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement|null>(null);

  // var that tracks if sort menu is open
  const open = Boolean(anchorEl);

  // handles opening the sort menu
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // handles closing sort menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // state for opening/closing collapsible menu below comment bar
  const [expand, setExpand] = useState<boolean>(false);

  // tracks value in comment bar
  const [fieldVal, setFieldVal] = useState<string>("");

  // resets comment bar and collapses menu below it
  const handleCancel = () => {
    setFieldVal("");
    setExpand(false);
  };

  return (
    <BaseContainer>
      <CSMainContainer>
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
      </CSMainContainer>
      <Contents>
        <Comment isReply={false}/>
      </Contents>
    </BaseContainer>
  );
};
