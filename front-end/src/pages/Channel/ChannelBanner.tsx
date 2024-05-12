import {BACKEND_BASE_URL} from "../../utils/Constants";
import {BannerHolder} from "./Styling";
import {FC} from "react";

export const ChannelBanner: FC<{banner: string, sideExpand: boolean}> = (props) => {
  const { banner, sideExpand } = props;

  return <BannerHolder sideExpand={sideExpand} src={BACKEND_BASE_URL + banner}/>;
};
