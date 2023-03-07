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
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../ColorThemes";
import SortIcon from "@mui/icons-material/Sort";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const BaseContainer = styled("div")``;

const MainContainer = styled(Stack)`
  --paper-input-container-input-align: baseline;
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
`;

const SortMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 300;
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
        <Contents>
          <CommentThread></CommentThread>
        </Contents>
      </MainContainer>
    </BaseContainer>
  );
};
