import { Avatar, Box, Stack, styled, Typography } from "@mui/material";
import thumbnail from "../staticfiles/youtube-thumbnail.png"
import { colors } from "../utils/ColorThemes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import {FC} from "react";
import {ComponentWithProps} from "../types/types";

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

const Thumbnail = styled('img')`
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

const Title = styled(Typography)<ComponentWithProps>`
  margin: ${({ inChannelHome }) =>
    inChannelHome ? "8px 0px 8px 0px" : "12px 0px 6px 0px"};
  font-family: Roboto;
  font-size: ${({ inChannelHome }) => (inChannelHome ? "14px" : "16px")};
  line-height: 20px;
  font-weight: 500;
  overflow: hidden;
  max-height: 40px;
  text-overflow: ellipsis;
  white-space: normal;
`;

const ChannelName = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto, serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  white-space: normal;

  :hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Verified = styled(Box)`
  width: 20px;
  align-items: center;
  display: flex;
  margin: 0 0 0 4px;
`;

const ViewsAndDate = styled(Typography)<ComponentWithProps>`
  color: ${colors.textGrey};
  font-family: Roboto, serif;
  font-size: ${({ inChannelHome }) => (inChannelHome ? "12px" : "14px")};
  line-height: ${({ inChannelHome }) => (inChannelHome ? "18px" : "20px")};
  font-weight: 400;
  white-space: normal;
`;

export const VideoContainer: FC<{inChannelHome: boolean, inChannel: boolean}> = (props) => {
  const navigate = useNavigate();
  const url = window.location.href;

  const handleRouting = (val: string) => {
    if (window.location.href === url) {
      navigate(val);
    }
  };

  const { inChannel, inChannelHome } = props;

  return (
    <Container onClick={() => handleRouting("/watch")}>
      <InnerContainer>
        <ThumbnailContainer>
          <Thumbnail src={thumbnail} />
        </ThumbnailContainer>
        <Box>
          <Stack direction="row">
            {!inChannel && (
              <ChannelProfile onClick={() => handleRouting("/channel/@car")} />
            )}
            {/* the data here will come from the back-end */}
            <DetailBox>
              <Stack>
                <Title inChannelHome={inChannelHome}>Video Title</Title>{" "}
                {/* the data here will come from the back-end */}
                <Box>
                  <Stack>
                    {!inChannel && (
                      <Stack direction="row">
                        <ChannelName
                          onClick={() => handleRouting("/channel/@car")}
                        >
                          Channel Name
                        </ChannelName>
                        {/* the data here will come from the back-end */}
                        <Verified>
                          <CheckCircleIcon
                            sx={{
                              color: "white",
                              width: "14px",
                              height: "14px",
                            }}
                          />
                        </Verified>
                      </Stack>
                    )}
                    <ViewsAndDate inChannelHome={inChannelHome}>
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
