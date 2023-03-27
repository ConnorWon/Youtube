import { Avatar, Box, Stack, styled, Typography } from "@mui/material";
import React from "react";
import thumbnail from "./youtube-thumbnail.png";
import { colors } from "../../../ColorThemes";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  height: 100%;
  cursor: pointer;
`;

const InnerContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailContainer = styled(Box)`
  width: 100%;
  position: relative;
`;

const Thumbnail = styled(Box)`
  width: inherit;
  height: auto;
  border-radius: 10px;
`;

const DetailBox = styled(Box)`
  padding-right: 24px;
`;

const Title = styled(Typography)`
  margin: 8px 0px 8px 0px;
  font-family: Roboto;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  overflow: hidden;
  max-height: 40px;
  text-overflow: ellipsis;
  white-space: normal;
`;

const ViewsAndDate = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  white-space: normal;
`;

export const VideoContainer = () => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate("/watch")}>
      <InnerContainer>
        <ThumbnailContainer>
          <Thumbnail component="img" src={thumbnail} />
        </ThumbnailContainer>
        <Box>
          <Stack direction="row">
            <DetailBox>
              <Stack>
                <Title>Video Title</Title>{" "}
                {/* the data here will come from the back-end */}
                <Box>
                  <Stack>
                    <ViewsAndDate>
                      867K views {"\u2022"} 1 year ago{" "}
                      {/* the data here will come from the back-end */}
                    </ViewsAndDate>
                  </Stack>
                </Box>
              </Stack>
            </DetailBox>
          </Stack>
        </Box>
      </InnerContainer>
    </Container>
  );
};
