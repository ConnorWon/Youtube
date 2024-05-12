import {
  Title,
  BPMainContainer,
  VideoInfoContainer,
  RelatedVideos,
} from "./Styling";
import { ChannelButtons } from "./ChannelButtons";
import { Description } from "./Description";
import { CommentSection } from "./CommentSection/CommentSection";
import { VideoPageSidebar } from "../../Sidebar/VideoPageSidebar";

export const BelowPlayer = () => {
  return (
    <BPMainContainer>
      <VideoInfoContainer>
        <div>
          <Title>Video Title</Title>
        </div>
        <ChannelButtons />
        <Description />
      </VideoInfoContainer>
      <RelatedVideos>
        <VideoPageSidebar />
      </RelatedVideos>
      <CommentSection />
    </BPMainContainer>
  );
};
