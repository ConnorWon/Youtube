import {
  Box,
  Stack,
  TableContainer,
  Typography,
  TableBody,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  MainContainer,
  AboutLeftColumn,
  SectionTitle,
  SectionContainer,
  DescriptionText,
  DetailsRowContentContainer,
  DetailsRowNameContainer,
  DetailsText,
  EmailButton,
  LinkText,
  ReportContainer,
  ReportButton,
  AboutRightColumn,
  StatsText,
} from "./Styling";
import React, { useState } from "react";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

export const About = (props) => {
  // sideExpand used for resizing MainContainer element
  const { sideExpand } = props;

  // state for show email button
  const [revealEmail, setRevealEmail] = useState(false);

  // dummy channel links
  const links = ["Twitter", "Instagram", "Website"];

  return (
    <MainContainer sideExpand={sideExpand}>
      <Stack direction="row">
        <AboutLeftColumn>
          <SectionContainer>
            <Typography>
              <SectionTitle>Description</SectionTitle>
              <DescriptionText>Description Text</DescriptionText>
            </Typography>
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>Details</SectionTitle>
            <TableContainer component={Box}>
              <TableBody>
                <TableRow sx={{ height: "42px;" }}>
                  <DetailsRowNameContainer>
                    <DetailsText>For business inquiries:</DetailsText>
                  </DetailsRowNameContainer>
                  <DetailsRowContentContainer>
                    {revealEmail ? (
                      <LinkText href="mailto:email@email.com">
                        email@email.com
                      </LinkText>
                    ) : (
                      <EmailButton onClick={() => setRevealEmail(true)}>
                        View email address
                      </EmailButton>
                    )}
                  </DetailsRowContentContainer>
                </TableRow>
                <TableRow sx={{ height: "42px;" }}>
                  <DetailsRowNameContainer>
                    <DetailsText>Location:</DetailsText>
                  </DetailsRowNameContainer>
                  <DetailsRowContentContainer>
                    <DetailsText>Greenland</DetailsText>
                  </DetailsRowContentContainer>
                </TableRow>
              </TableBody>
            </TableContainer>
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>Links</SectionTitle>
            <Stack sx={{ display: "block" }}>
              {links.map((link) => (
                <LinkText
                  href="https://www.youtube.com/"
                  sx={{
                    textDecoration: "none",
                    width: "40%",
                    mb: "24px;",
                    display: "inline-block",
                  }}
                >
                  {link}
                </LinkText>
              ))}
            </Stack>
          </SectionContainer>
        </AboutLeftColumn>
        <AboutRightColumn>
          <SectionTitle
            sx={{
              padding: "12px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              m: "12px 0 0",
            }}
          >
            Stats
          </SectionTitle>
          <StatsText>Joined Aug 15 2021</StatsText>
          <StatsText>1,072,855,327 views</StatsText>
          <ReportContainer>
            <Tooltip title="Report user">
              <ReportButton>
                <FlagOutlinedIcon />
              </ReportButton>
            </Tooltip>
          </ReportContainer>
        </AboutRightColumn>
      </Stack>
    </MainContainer>
  );
};
