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
import { colors } from "../../../ColorThemes";

const DescriptionOuter = styled(Stack)`
  margin-right: -12px;
  flex-wrap: wrap;
`;

const DescriptionContainer = styled(Stack)`
  box-sizing: border-box;
  margin-right: 12px;
  margin-top: 12px;
  flex: 1;
  flex-basis: 1e-9px;
  font-family: Roboto;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  min-width: max(381px, 50% - 12px);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: ${({ expandDesc }) => (expandDesc ? "default" : "pointer")};
  pointer-events: ${({ expandDesc }) => (expandDesc ? "none" : "auto")};

  :hover {
    background: ${({ expandDesc }) =>
      expandDesc ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"};
  }
`;

const DescriptionInner = styled("div")`
  margin: 12px;
`;

const PostInfoContainer = styled("div")`
  overflow: hidden;
`;

const PostInfo = styled(Typography)`
  white-space: pre;
  color: inherit;
  font-weight: 500;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
  display: inline-block;
`;

const PostHashTags = styled(Link)`
  color: #aaa;
  text-decoration: none;
  word-wrap: none;
  word-break: none;
  font-weight: 500;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
  display: inline-block;
`;

const DescriptionCollapse = styled(Collapse)`
  white-space: pre-wrap;
`;

const DescriptionExpandable = styled("div")`
  position: relative;
  overflow: hidden;
  contain: content;
  color: ${colors.textWhite};
  font-weight: inherit;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
`;

const DescriptionText = styled("span")``;

export const Description = () => {
  const [expandDesc, setExpandDesc] = useState(false);

  return (
    <DescriptionOuter>
      <DescriptionContainer
        onClick={() => setExpandDesc(!expandDesc)}
        expandDesc={expandDesc}
      >
        <DescriptionInner>
          <PostInfoContainer>
            <PostInfo>670K views 11 days ago </PostInfo>
            <PostHashTags>#helloworld #test</PostHashTags>
          </PostInfoContainer>
          <DescriptionCollapse
            in={expandDesc}
            timeout="auto"
            collapsedSize="60px"
          >
            <DescriptionExpandable>
              <DescriptionText>
                follow me on twitter ► https://www.twitter.com/ludwigahgren{" "}
                <br />
                follow me on tiktok ► https://www.tiktok.com/@ludwig <br />
                follow me on instagram ► https://www.instagram.com/ludwigahgren{" "}
                <br />
                join my subreddit ► https://old.reddit.com/r/LudwigAhgren/{" "}
                <br />
                join my discord ► https://discord.gg/ludwig LINK TO <br />
                EVERYTHING ► https://wlo.link/@ludwig <br /> <br />
                edited by: https://twitter.com/shakedrizzle <br /> <br />
                #ludwig #japan #storytime
              </DescriptionText>
              {expandDesc && (
                <DescriptionText
                  sx={{ cursor: "pointer", pointerEvents: "auto" }}
                  onClick={() => setExpandDesc(!expandDesc)}
                >
                  <br /> <br />
                  Show Less
                </DescriptionText>
              )}
            </DescriptionExpandable>
          </DescriptionCollapse>
        </DescriptionInner>
      </DescriptionContainer>
    </DescriptionOuter>
  );
};
