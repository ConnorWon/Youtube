import { Box, styled } from "@mui/material";

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

export const MainContainer = styled("div")`
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
