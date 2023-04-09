import React, { useState } from "react";
import {
  DescriptionOuter,
  DescriptionContainer,
  DescriptionInner,
  PostInfoContainer,
  PostInfo,
  PostHashTags,
  DescriptionCollapse,
  DescriptionExpandable,
  DescriptionText,
} from "./Styling";

export const Description = () => {
  // used to expand and collapse description
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
                join my discord ► https://discord.gg/ludwig <br />
                LINK TO EVERYTHING ► https://wlo.link/@ludwig <br /> <br />
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
