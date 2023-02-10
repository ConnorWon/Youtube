import { Box, styled } from "@mui/material";

export const ChannelBanner = (props) => {
  const { banner, sideExpand } = props;

  const BannerHolder = styled(Box)`
    background-image: url(${banner});
    height: ${({ sideExpand }) =>
      sideExpand
        ? "calc((100vw - 240px) / 6.2 - 1px)"
        : "calc(16.1290322581vw - 1px)"};
    background-position: center;
  `;

  return <BannerHolder sideExpand={sideExpand} />;
};
