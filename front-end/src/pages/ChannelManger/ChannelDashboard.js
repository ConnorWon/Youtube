import { Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import { FormField } from "../../components/FormField";
import "./Styling.css";
import { UserContext } from "../../contexts/UserContext";
import { updateChannel } from "../../utils/apiRequests";
import {
  MainContainer,
  HeaderContainer,
  HeaderText,
  FieldLabel,
  FieldsContainer,
  ButtonsContainer,
  AuthButton,
} from "./Styling";

export const ChannelDashboard = () => {
  const { loggedChannel } = useContext(UserContext);

  const [name, setName] = useState(loggedChannel.data.name);
  const [tag, setTag] = useState(loggedChannel.data.tag.substring(1));

  const resetFields = () => {
    setTag(loggedChannel.data.tag.substring(1));
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
        <AuthButton
          disabled={
            name === loggedChannel.data.name &&
            tag === loggedChannel.data.tag.substring(1)
          }
          onClick={resetFields}
        >
          Cancel
        </AuthButton>
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
