import { styled } from "@mui/material";
import {backendBaseURL} from "../../utils/Constants";

export const ChannelBanner = (props) => {
  const { banner, sideExpand } = props;

  const BannerHolder = styled("img")`
    height: calc(16.1290322581vw - 1px);
    width: 100%;
    object-fit: cover;

    @media only screen and (min-width: 1313px) {
      height: ${({ sideExpand }) =>
        sideExpand
          ? "calc((100vw - 240px) / 6.2 - 1px)"
          : "calc(16.1290322581vw - 1px)"};
    }
  `;

  return <BannerHolder sideExpand={sideExpand} src={backendBaseURL + banner}/>;
};
