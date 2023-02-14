import React from "react";
import { Box, Stack, styled, Link, Button } from "@mui/material";
import { colors } from "../../ColorThemes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const SubHeaderContainer = styled(Box)`
  margin-top: 8px;
`;

const SubHeaderInner = styled(Stack)`
  color: ${colors.textWhite};
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubHeaderTitle = styled(Link)`
  text-decoration: none;
  color: ${colors.textWhite};
  display: flex;
  line-height: 22px;
  font-weight: 500;
  overflow: hidden;
  display: block;
  max-height: 22px;
  font-size: 16px;
  -webkit-line-clamp: 1;
`;

const PlayButton = styled(Button)`
  text-transform: none;
  display: inline-block;
  padding: 0 16px 0 12px;
  height: 36px;
  font-size: 14px;
  line-height: 22px;
  border-radius: 18px;
  color: ${colors.textWhite};
  align-items: center;

  & .MuiButton-startIcon {
    margin-left: 0;
    position: relative;
    top: 6px;

    &.css-1d6wzja-MuiButton-startIcon > *:nth-of-type(1) {
      font-size: 25px;
    }
  }

  :hover {
    background-color: rgba(63, 63, 63, 1);
  }
`;

export const Home = () => {
  return (
    <div>
      <SubHeaderContainer>
        <SubHeaderInner direction="row">
          <Box>
            <SubHeaderTitle href="/channel/videos">Videos</SubHeaderTitle>
          </Box>
          <Box sx={{ ml: "4px" }}>
            <PlayButton startIcon={<PlayArrowIcon />} href="/channel/about">
              <Link
                sx={{
                  textDecoration: "none",
                  color: colors.textWhite,
                  position: "relative",
                  top: "-1.5px",
                }}
              >
                Play all
              </Link>
            </PlayButton>
          </Box>
        </SubHeaderInner>
      </SubHeaderContainer>
    </div>
  );
};
