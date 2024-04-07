import { Avatar, Stack } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { FormField } from "../../components/FormField";
import "./Styling.css";
import { UserContext } from "../../contexts/UserContext";
import { updateChannel, uploadImageForChannel } from "../../utils/apiRequests";
import CloseIcon from "@mui/icons-material/Close";
import {
  MainContainer,
  HeaderContainer,
  HeaderText,
  FieldLabel,
  FieldsContainer,
  ButtonsContainer,
  AuthButton,
  ImageUploadContainer,
  ImageUploadButton,
  InnerImageUploadContainer,
  FileNameText,
  ImageClearButton,
  FileContentContainer,
} from "./Styling";
import { backendBaseURL } from "../../utils/Constants";

export const ChannelDashboard = () => {
  const { loggedChannel, setLoggedChannelExcludingSubData } = useContext(UserContext);

  const [name, setName] = useState(loggedChannel.data.name);
  const [tag, setTag] = useState(loggedChannel.data.tag.substring(1));
  const [profilePicture, setProfilePicture] = useState(null);

  const profilePictureInputRef = useRef(null);

  const resetFields = () => {
    setTag(loggedChannel.data.tag.substring(1));
    setName(loggedChannel.data.name);
    profilePictureInputRef.current.value = null;
    setProfilePicture(null);
  };

  const updateChannelProfilePicture = async () => {
    const imgForm = new FormData();
    imgForm.append("profile_pic", profilePicture);
    const response = await uploadImageForChannel(imgForm);
    if (response.status === 200) {
      setLoggedChannelExcludingSubData(response.data);
      clearInput();
    } else {
      console.log(response.msg);
    }
    resetFields();
  };

  const updateChannelInfo = async () => {
    const response = await updateChannel(name, tag);
    if (response.status === 200) {
      setLoggedChannelExcludingSubData(response.data);
    } else if (response.status === 400) {
      console.log(
        "Could not activate your channel. Status Code: " +
          response.status.toString()
      );
    } else {
      console.log(response.msg);
    }
    if (profilePicture) {
      await updateChannelProfilePicture();
    }
  };

  const handleInputClick = () => {
    profilePictureInputRef.current.click();
  };

  const handleImageInputChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const clearInput = () => {
    profilePictureInputRef.current.value = null;
    setProfilePicture(null);
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
        <ImageUploadContainer>
          <FieldLabel>Profile Picture:</FieldLabel>
          <Avatar
            src={backendBaseURL + loggedChannel.data.profile_pic}
            sx={{ width: 100, height: 100 }}
          />
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            id="profile-picture-upload-ch-manager"
            onChange={handleImageInputChange}
            ref={profilePictureInputRef}
          />
          <InnerImageUploadContainer>
            <ImageUploadButton
              variant="contained"
              disableTouchRipple
              onClick={handleInputClick}
            >
              Upload
            </ImageUploadButton>
            {profilePicture && (
              <FileContentContainer>
                <FileNameText>{profilePicture.name}</FileNameText>
                <ImageClearButton disableRipple onClick={clearInput}>
                  <CloseIcon
                    sx={{ width: "18px", height: "18px", color: "red" }}
                  />
                </ImageClearButton>
              </FileContentContainer>
            )}
          </InnerImageUploadContainer>
        </ImageUploadContainer>
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
