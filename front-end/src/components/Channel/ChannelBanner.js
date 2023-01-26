import { Box, styled } from "@mui/material";

export const ChannelBanner = ({ banner }) => {
  const BannerHolder = styled(Box)`
    background-image: url(${banner});
    height: calc(16.1290322581vw - 1px);
    background-position: center;
  `;

  return <BannerHolder />;
};
