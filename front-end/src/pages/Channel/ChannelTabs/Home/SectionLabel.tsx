import {
  SubHeaderContainer,
  SubHeaderInner,
  SubHeaderTitle,
  PlayButton,
} from "./Styling";
import { Box, Link } from "@mui/material";
import { colors } from "../../../../utils/ColorThemes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {FC} from "react";

export const SectionLabel: FC<{isVideoSection: boolean}> = (props) => {
  // used to determine what type of section it is -> later replaced with user defined header
  const { isVideoSection } = props;

  return (
    <SubHeaderContainer>
      <SubHeaderInner direction="row">
        <Box>
          <SubHeaderTitle href="/channel/videos">
            {isVideoSection ? "Videos" : "Channels"}
          </SubHeaderTitle>
        </Box>
        {isVideoSection && (
          <Box sx={{ ml: "4px" }}>
            <PlayButton startIcon={<PlayArrowIcon />} href="/watch">
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
        )}
      </SubHeaderInner>
    </SubHeaderContainer>
  );
};
