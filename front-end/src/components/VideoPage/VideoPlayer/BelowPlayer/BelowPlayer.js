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
  Collapse,
} from "@mui/material";
import "./Styling.css";
import { colors } from "../../../ColorThemes";
import { ChannelButtons } from "./ChannelButtons";
import { Description } from "./Description";
import { CommentSection } from "./CommentSection";
import { VideoPageSidebar } from "../../Sidebar/VideoPageSidebar";

const MainContainer = styled("div")`
  position: relative;
`;

const VideoInfoContainer = styled("div")`
  margin-top: calc(var(--margin-size) / 3);
  margin-bottom: var(--margin-size);
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

// const RelatedVids = styled("div")`
//   @media only screen and (min-width: 1015px) {
//     display: none;
//   }
// `;

export const BelowPlayer = () => {
  const [expandDesc, setExpandDesc] = useState(false);

  return (
    <MainContainer>
      <VideoInfoContainer>
        <div>
          <Title>Video Title</Title>
        </div>
        <ChannelButtons />
        <Description />
      </VideoInfoContainer>
      {/* <RelatedVids>
        <VideoPageSidebar />
      </RelatedVids> */}
      <CommentSection />
    </MainContainer>
  );
};
