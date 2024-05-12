import {ReactElement} from "react";
import {SvgIconProps} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import SettingsIcon from "@mui/icons-material/Settings";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";

export const BACKEND_BASE_URL = "http://127.0.0.1:8000";

interface SearchFilter {
    category: string,
    options: string[],
}

export const SEARCH_FILTERS: SearchFilter[] = [
    {
        category: "Upload Date",
        options: ["Last hour", "Today", "This week", "This month", "This year"],
    },
    {
        category: "Type",
        options: ["Video", "Channel", "Playlist", "Movie"],
    },
    {
       category: "Duration",
       options: ["Under 4 minutes", "4 - 20 minutes", "Over 20 minutes"],
    },
    {
        category: "Features",
        options: [
            "Live",
            "4K",
            "HD",
            "Subtitles/CC",
            "Creative Commons",
            "360\u00B0",
            "VR180",
            "3D",
            "HDR",
            "Location",
            "Purchased",
        ],
    },
    {
        category: "Sort By",
        options: ["Relevance", "Upload Date", "View Count", "Rating"],
    }
];

interface SidebarButton {
    link: string,
    label: string,
    icon: ReactElement<SvgIconProps>
}

export const MINI_SIDEBAR_BUTTONS: SidebarButton[] = [
    {
        link: "/",
        label: "Home",
        icon: <HomeOutlinedIcon />
    },
    {
        link: "/watch",
        label: "Shorts",
        icon: <SlideshowIcon />
    },
    {
        link: "/results",
        label: "Subscriptions",
        icon: <SubscriptionsOutlinedIcon />
    },
    {
        link: "/channel/@car", // TODO: change to legit link after necessary code is provided
        label: "Library",
        icon: <VideoLibraryOutlinedIcon />
    },
];

export const MAIN_SIDEBAR_BUTTONS: SidebarButton[] = [
    {
        link: "/",
        label: "Home",
        icon: <HomeOutlinedIcon />
    },
    {
        link: "/watch",
        label: "Shorts",
        icon: <SlideshowIcon />
    },
    {
        link: "/results",
        label: "Subscriptions",
        icon: <SubscriptionsOutlinedIcon />
    },
];

export const SECONDARY_SIDEBAR_BUTTONS: SidebarButton[] = [
    {
        link: "/channel/@car",  // TODO: change to legit link after necessary code is provided
        label: "Library",
        icon: <VideoLibraryOutlinedIcon />
    },
    {
        link: "/",
        label: "History",
        icon: <HistoryOutlinedIcon />
    }
];

export const EXPLORE_SIDEBAR_BUTTONS: SidebarButton[] = [
    {
        link: "/",
        label: "Trending",
        icon: <WhatshotOutlinedIcon />
    },
    {
        link: "/",
        label: "Music",
        icon: <MusicNoteOutlinedIcon />
    },
    {
        link: "/",
        label: "Movies & Shows",
        icon: <MovieCreationOutlinedIcon />
    },
    {
        link: "/",
        label: "Live",
        icon: <StreamOutlinedIcon />
    },
    {
        link: "/",
        label: "Gaming",
        icon: <SportsEsportsOutlinedIcon />
    },
    {
        link: "/",
        label: "News",
        icon: <FeedOutlinedIcon />
    },
    {
        link: "/",
        label: "Sports",
        icon: <EmojiEventsOutlinedIcon />
    },
    {
        link: "/",
        label: "Learning",
        icon: <LightbulbOutlinedIcon />
    },
    {
        link: "/",
        label: "Fashion & Beauty",
        icon: <DiamondOutlinedIcon />
    },
];

export const CHANNEL_TAB_ROUTES: string[][] = [
    ["", "Home"],
    ["/videos", "Videos"],
    ["/shorts", "Shorts"],
    ["/live", "Live"],
    ["/playlists", "Playlists"],
    ["/community", "Community"],
    ["/channels", "Channels"],
    ["/about", "About"],
];

export const DUMMY_CHANNEL_ABOUT_LINKS: string[] = ["Twitter", "Instagram", "Website"]

export const DUMMY_VIDEOS: string[] = [
    "Video 1",
    "Video 2",
    "Video 3",
    "Video 4",
    "Video 5",
    "Video 6",
    "Video 7",
    "Video 8",
    "Video 1",
    "Video 2",
    "Video 3",
    "Video 4",
    "Video 5",
    "Video 6",
    "Video 7",
    "Video 8",
];

export const DUMMY_CHANNEL_SCROLL_DETERMINANTS: boolean[] = [
    true,
    true,
    false,
];

export const VIDEO_CONTROL_RIGHT_SIDE_BUTTONS: ReactElement<SvgIconProps>[] = [
    <ClosedCaptionIcon />,
    <SettingsIcon />,
    <BrandingWatermarkIcon />,
    <CropLandscapeIcon />,
];

export const DUMMY_HOME_TAB_OPTIONS: string[] = [
    "Apple",
    "Orange",
    "Banana",
    "Grape",
    "Pineapple",
    "Cantaloupe",
    "Blueberry",
    "Strawberry",
    "Watermelon",
    "Papaya",
    "Grapefruit",
    "Honeydew",
    "Blackberry",
    "Raspberry",
];
