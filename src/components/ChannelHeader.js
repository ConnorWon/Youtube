import {
  Box,
  ThemeProvider,
  styled,
  createTheme,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import { colors } from "./ColorThemes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ChannelHeaderExternal = styled("div")`
  display: flex;
  position: relative;
  margin-left: 72px;
`;

const ChannelHeaderMiddle = styled(Box)`
  background-color: ${colors.bgColorDark};
  padding: 16px 107px 4px;
  width: 100%;
  height: 80px;

  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (max-width: 0px) {
    padding: 0px;
  }

  @media only screen and (min-width: 686px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (min-width: 973px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (min-width: 1186px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (min-width: 1400px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }
`;

const ChannelHeaderInner = styled(Stack)`
  display: flex;
  position: relative;
  height: 100%;
  max-width: 1284px;
  align-items: center;
`;

const ChannelIcon = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin: 0 24px 0 0;
  flex: none;
`;

const InnerContainer = styled(Stack)`
  flex-wrap: wrap;
  flex: 1;
  flex-basis: 1e-9px;
  align-items: center;
`;

const InfoContainer = styled(Stack)`
  min-width: 150px;
  flex: 1;
  flex-basis: 1e-9px;
  max-height: 9rem;
  overflow: hidden;
`;

const NameContainer = styled(Stack)`
  align-items: center;
`;

const Name = styled(Typography)`
  color: white;
  font-family: Roboto;
  font-weight: 700;
  line-height: 1;

  @media only screen and (min-width: 686px) {
    font-size: 23px;
  }
`;

const Verified = styled(Box)`
  width: 20px;
  align-items: center;
  display: flex;
  margin: 0 0 0 8px;
`;

const Tag = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
`;

const BtnContainer = styled(Stack)`
  display: flex;
  flex-direction: row;
`;

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 686,
//       md: 973,
//       lg: 1186,
//       xl: 1400,
//     },
//   },
// });

export const ChannelHeader = () => {
  return (
    <ChannelHeaderExternal>
      <ChannelHeaderMiddle>
        <ChannelHeaderInner direction="row">
          <ChannelIcon />
          <InnerContainer direction="row">
            <InfoContainer>
              <NameContainer direction="row">
                <Name>Channel_Name</Name>
                <Verified>
                  <CheckCircleIcon
                    sx={{ color: "white", width: "14px", height: "14px" }}
                  />
                </Verified>
              </NameContainer>
              <Tag>@Tag</Tag>
              <Tag>1.0M Subscribers</Tag>
            </InfoContainer>
            <BtnContainer>
              {/* <JoinBtn />
              <SubBtn /> */}
            </BtnContainer>
          </InnerContainer>
        </ChannelHeaderInner>
      </ChannelHeaderMiddle>
    </ChannelHeaderExternal>
  );
};
