import { Avatar, Box, Stack, styled, Typography } from "@mui/material";
import React from "react";
import thumbnail from "./youtube-thumbnail.png";
import { colors } from "../ColorThemes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Container = styled(Box)`
  height: 100%;
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

const ChannelProfile = styled(Avatar)`
  height: 36px;
  width: 36px;
  margin-top: 12px;
  margin-right: 12px;
`;

const DetailBox = styled(Box)`
  padding-right: 24px;
`;

const Title = styled(Typography)`
  margin: 12px 0px 6px 0px;
  font-family: Roboto;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  overflow: hidden;
  max-height: 40px;
  text-overflow: ellipsis;
  white-space: normal;
`;

const ChannelName = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  white-space: normal;
`;

const ViewsAndDate = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  white-space: normal;
`;

const Verified = styled(Box)`
  width: 20px;
  align-items: center;
  display: flex;
  margin: 0 0 0 4px;
`;

export const VideoContainer = () => {
  return (
    <Container>
      <InnerContainer>
        <ThumbnailContainer>
          <Thumbnail component="img" src={thumbnail} />
        </ThumbnailContainer>
        <Box>
          <Stack direction="row">
            <ChannelProfile /> {/* the data here will come from the back-end */}
            <DetailBox>
              <Stack>
                <Title>Video Title</Title>{" "}
                {/* the data here will come from the back-end */}
                <Box>
                  <Stack>
                    <Stack direction="row">
                      <ChannelName>Channel Name</ChannelName>{" "}
                      {/* the data here will come from the back-end */}
                      <Verified>
                        <CheckCircleIcon
                          sx={{ color: "white", width: "14px", height: "14px" }}
                        />
                      </Verified>
                    </Stack>
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
