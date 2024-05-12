// noinspection CssUnknownUnit

import {
  Box,
  styled,
  Stack,
  TableCell,
  Typography,
  Button,
  Link,
  Grid,
} from "@mui/material";
import { colors } from "../../../utils/ColorThemes";
import {ComponentWithProps} from "../../../types/types";

// All Tabs Styling

export const NoContent = styled(Box)`
  padding: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

export const MainContainer = styled("div")<ComponentWithProps>`
  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (min-width: 686px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (min-width: 1187px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (min-width: 1313px) and (max-width: 1354px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 856px) / 2)" : "calc((100% - 1070px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 856px) / 2)" : "calc((100% - 1070px) / 2)"};
  }

  @media only screen and (min-width: 1401px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1070px) / 2)" : "calc((100% - 1284px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1070px) / 2)" : "calc((100% - 1284px) / 2)"};
  }

  @media only screen and (min-width: 1569px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }
`;

// About Styling

export const AboutLeftColumn = styled(Stack)`
  color: ${colors.textWhite};
  padding-right: 96px;
  min-width: 0;
  word-wrap: break-word;
  flex: 2;
`;

export const SectionTitle = styled(Typography)`
  display: block;
  margin: 24px 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
`;

export const SectionContainer = styled(Box)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 32px;
`;

export const DescriptionText = styled(Typography)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  white-space: pre-wrap;
`;

export const DetailsRowNameContainer = styled(TableCell)`
  padding: 0 32px 4px 0;
  border: 0;
`;

export const DetailsRowContentContainer = styled(TableCell)`
  padding: 0 0 4px;
  border: 0;
`;

export const DetailsText = styled(Typography)`
  color: #aaa;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
`;

export const EmailButton = styled(Button)`
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  height: 36px;
  font-weight: 500;
  background-color: rgb(63, 63, 63);
  color: white;
  text-transform: none;
  margin-left: -16px;
  padding: 0 16px;
  white-space: nowrap;
  letter-spacing: 0;

  :hover {
    background-color: rgba(256, 256, 256, 0.3);
  }
`;

export const LinkText = styled(Link)`
  color: #3ea6ff;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  text-decoration: underline;
`;

export const AboutRightColumn = styled(Box)`
  color: ${colors.textWhite};
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  flex: 1;
  flex-basis: 1e-9px;
`;

export const StatsText = styled(Typography)`
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: block;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: unset;
`;

export const ReportContainer = styled(Box)`
  margin-top: 8px;
  margin-left: -8px;
`;

export const ReportButton = styled(Button)`
  margin-right: 16px;
  display: inline-block;
  color: ${colors.textWhite};
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  min-width: 0;

  :hover {
    background-color: rgba(63, 63, 63, 1);
  }
`;

// Videos Styling

export const VideoOuterContainer = styled(Grid)<ComponentWithProps>`
  margin: 0 8px 40px 8px;
  max-width: 360px;

  @media only screen and (min-width: 1187px) {
    max-width: 340px;
  }

  @media only screen and (min-width: 1313px) and (max-width: 1354px) {
    max-width: ${({ sideExpand }) => (sideExpand ? "360px" : "340px")};
  }

  @media only screen and (min-width: 1401px) {
    max-width: ${({ sideExpand }) => (sideExpand ? "340px" : "360px")};
  }

  @media only screen and (min-width: 1569px) {
    max-width: 360px;
  }
`;

export const VideoFiltersContainer = styled(Stack)`
  padding-top: 16px;
  padding-bottom: 12px;
`;

export const FilterButton = styled(Button)<ComponentWithProps>`
  color: ${({ isFiltered }) => (isFiltered ? "#0f0f0f" : "white")};
  background-color: ${({ isFiltered }) => (isFiltered ? "white" : "rgb(63, 63, 63)")};
  text-transform: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 8px;

  :hover {
    background-color: ${({ isFiltered }) =>
      isFiltered ? "rgba(256, 256, 256, 1)" : "rgba(256, 256, 256, 0.3)"};
  }
`;

export const ContentContainer = styled(Grid)<ComponentWithProps>`
  width: 100%;
  display: flex;

  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 376px) / 2);
    padding-left: calc((100% - 376px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 752px) / 2);
    padding-left: calc((100% - 752px) / 2);
  }

  @media only screen and (min-width: 1187px) {
    padding-right: calc((100% - 1068px) / 2);
    padding-left: calc((100% - 1068px) / 2);
  }

  @media only screen and (min-width: 1313px) and (max-width: 1354px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 752px) / 2)" : "calc((100% - 1068px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 752px) / 2)" : "calc((100% - 1068px) / 2)"};
  }

  @media only screen and (min-width: 1401px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1068px) / 2)" : "calc((100% - 1128px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1068px) / 2)" : "calc((100% - 1128px) / 2)"};
  }

  @media only screen and (min-width: 1569px) {
    padding-right: calc((100% - 1128px) / 2);
    padding-left: calc((100% - 1128px) / 2);
  }
`;
