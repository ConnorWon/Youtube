import {
  Box,
  Stack,
  TableCell,
  TableContainer,
  Typography,
  styled,
  Button,
  Link,
  TableBody,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../ColorThemes";

export const About = () => {
  const AboutLeftColumn = styled(Stack)`
    color: ${colors.textWhite};
    padding-right: 96px;
    min-width: 0;
    word-wrap: break-word;
    flex: 2;
  `;

  const SectionTitle = styled(Typography)`
    display: block;
    margin: 24px 0px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
  `;

  const SectionContainer = styled(Box)`
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 32px;
  `;

  const DescriptionText = styled(Typography)`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    white-space: pre-wrap;
  `;

  const DetailsRowNameContainer = styled(TableCell)`
    padding-right: 32px;
    padding-bottom: 4px;
    padding-top: 0;
    padding-left: 0;
    border: 0;
  `;

  const DetailsRowContentContainer = styled(TableCell)`
    padding-bottom: 4px;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    border: 0;
  `;

  const DetailsText = styled(Typography)`
    color: #aaa;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
  `;

  const EmailButton = styled(Button)`
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

    :hover {
      background-color: rgba(256, 256, 256, 0.3);
    }
  `;

  const LinkText = styled(Link)`
    color: #3ea6ff;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    text-decoration: underline;
  `;

  const [revealEmail, setRevealEmail] = useState(false);

  const links = ["Twitter", "Instagram", "Website"];

  return (
    <div>
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
      </Stack>
    </div>
  );
};
