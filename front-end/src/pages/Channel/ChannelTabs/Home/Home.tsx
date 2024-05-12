import { VideosScroll } from "./VideosScroll";
import { MainContainer } from "../Styling";
import {FC} from "react";
import {DUMMY_CHANNEL_SCROLL_DETERMINANTS, DUMMY_VIDEOS} from "../../../../utils/Constants";

export const Home: FC<{sideExpand: boolean}> = (props) => {
  // sideExpand used for resizing MainContainer element
  const { sideExpand } = props;

  return (
    <MainContainer sideExpand={sideExpand}>
      <VideosScroll dummyData={DUMMY_VIDEOS} hasDivider={false} containerIndex={"0"} isVideoSection={true} />
      {DUMMY_CHANNEL_SCROLL_DETERMINANTS.map((bool, index) => (
        <VideosScroll dummyData={DUMMY_VIDEOS} hasDivider={true} containerIndex={(index + 1).toString()} isVideoSection={bool}/>
      ))}
    </MainContainer>
  );
};
