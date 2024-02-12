import { Button, Stack, Typography, styled } from "@mui/material";
import React, { useContext, useState } from "react";
import { FormField } from "../Auth/FormField";
import { colors } from "../../utils/ColorThemes";
import "./Styling.css";
import { UserContext } from "../../contexts/UserContext";
import { updateChannel } from "../../utils/apiRequests";

const MainContainer = styled(Stack)`
  width: 100%;
  align-items: start;
  gap: 16px;
`;

const HeaderText = styled(Typography)`
  font-size: 48px;
  color: white;
`;

const FieldLabel = styled(Typography)`
  font-size: 20px;
  color: white;
`;

const FieldsContainer = styled(Stack)`
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 876px;
`;

const ButtonsContainer = styled(Stack)`
  padding: 0 16px 0 16px;
  gap: 24px;
  box-sizing: border-box;
  flex-direction: row;
`;

const HeaderContainer = styled(Stack)`
  border-bottom: solid 1px ${colors.borderColor};
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

const AuthButton = styled(Button)`
  color: white;
  background-color: ${colors.youtubeRed};
  padding: 6px 20px;
  :hover {
    background-color: ${colors.youtubeRed};
  }
  &:disabled {
    opacity: 0.5;
    color: white;
    background-color: ${colors.youtubeRed};
  }
`;

export const ChannelDashboard = () => {
  const { loggedChannel } = useContext(UserContext);

  const [name, setName] = useState(loggedChannel.data.name);
  const [tag, setTag] = useState(loggedChannel.data.tag.substring(1));

  const resetFields = () => {
    setTag(loggedChannel.data.tag);
    setName(loggedChannel.data.name);
  };

  const updateChannelInfo = async () => {
    const response = await updateChannel(name, tag);
    if (response.status === 202) {
      window.location.reload();
    } else if (response.status === 400) {
      console.log(
        "Could not activate your channel. Status Code: " +
          response.status.toString()
      );
    } else {
      console.log(response.msg);
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText>Channel Info</HeaderText>
      </HeaderContainer>
      <FieldsContainer>
        <Stack className="FormFieldContainer">
          <FieldLabel>Name</FieldLabel>
          <FormField
            placeholder={"Enter Channel Name"}
            value={name}
            handleValue={setName}
          />
        </Stack>
        <Stack className="FormFieldContainer tag-form-field">
          <FieldLabel>Tag</FieldLabel>
          <FormField
            placeholder={"Set Your Tag"}
            value={tag}
            handleValue={setTag}
            startAdornment={"@"}
          />
        </Stack>
      </FieldsContainer>
      <ButtonsContainer>
        <AuthButton onClick={resetFields}>Cancel</AuthButton>
        <AuthButton
          disabled={name === "" || tag === ""}
          onClick={updateChannelInfo}
        >
          Submit
        </AuthButton>
      </ButtonsContainer>
    </MainContainer>
  );
};
