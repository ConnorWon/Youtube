import { Box, ThemeProvider, styled, createTheme } from "@mui/material";
import { colors } from "./ColorThemes";

const ChannelHeaderExternal = styled("div")`
  display: flex;
  position: relative;
`;

const ChannelHeaderMiddle = styled(Box)`
  background-color: ${colors.bgColorDark};
  padding: 16px 107px 4px;

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

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 686,
      md: 973,
      lg: 1186,
      xl: 1400,
    },
  },
});

export const ChannelHeader = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChannelHeaderExternal>
        <ChannelHeaderMiddle></ChannelHeaderMiddle>
      </ChannelHeaderExternal>
    </ThemeProvider>
  );
};
