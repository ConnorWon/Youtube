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
  FileContentContainer, BannerImage,
} from "./Styling";
import { backendBaseURL } from "../../utils/Constants";

export const ChannelDashboard = () => {
  const { loggedChannel, setLoggedChannelExcludingSubData } = useContext(UserContext);

  const [name, setName] = useState(loggedChannel.data.name);
  const [tag, setTag] = useState(loggedChannel.data.tag.substring(1));
  const [bannerImage, setBannerImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const bannerInputRef = useRef(null);
  const profilePictureInputRef = useRef(null);

  const resetFields = () => {
    setTag(loggedChannel.data.tag.substring(1));
    setName(loggedChannel.data.name);
    profilePictureInputRef.current.value = null;
    setProfilePicture(null);
    bannerInputRef.current.value = null;
    setBannerImage(null);
  };

  const updateChannelProfilePicture = async (imageField, image) => {
    const imgForm = new FormData();
    imgForm.append(imageField, image);
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
      setName(response.data.name);
      setTag(response.data.tag.substring(1));
    } else if (response.status === 400) {
      console.log(
        "Could not activate your channel. Status Code: " +
          response.status.toString()
      );
    } else {
      console.log(response.msg);
    }
    if (bannerImage) {
      await updateChannelProfilePicture("banner", bannerImage);
    }
    if (profilePicture) {
      await updateChannelProfilePicture("profile_pic", profilePicture);
    }
  };

  const handleInputClick = (isProfileInput) => {
    if (isProfileInput) {
      profilePictureInputRef.current.click();
    } else {
      bannerInputRef.current.click();
    }
  };

  const handleImageInputChange = (e, isProfileInput) => {
    if (isProfileInput) {
      setProfilePicture(e.target.files[0]);
    } else {
      setBannerImage(e.target.files[0]);
    }
  };

  const clearInput = (isProfileInput) => {
    if (isProfileInput) {
      profilePictureInputRef.current.value = null;
      setProfilePicture(null);
    } else {
      bannerInputRef.current.value = null;
      setBannerImage(null);
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
        <Stack className="FormFieldContainer">
          <FieldLabel>Channel Banner:</FieldLabel>
          <BannerImage src={backendBaseURL + loggedChannel.data.banner}/>
          <input
              style={{display: "none"}}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageInputChange(e, false)}
              ref={bannerInputRef}
          />
          <InnerImageUploadContainer>
            <ImageUploadButton
                variant="contained"
                disableTouchRipple
                onClick={() => handleInputClick(false)}
            >
              Upload
            </ImageUploadButton>
            {bannerImage && (
                <FileContentContainer>
                  <FileNameText>{bannerImage.name}</FileNameText>
                  <ImageClearButton disableRipple onClick={() => clearInput(false)}>
                    <CloseIcon
                        sx={{width: "18px", height: "18px", color: "red"}}
                    />
                  </ImageClearButton>
                </FileContentContainer>
            )}
          </InnerImageUploadContainer>
        </Stack>
        <ImageUploadContainer>
          <FieldLabel>Profile Picture:</FieldLabel>
          <Avatar
              src={backendBaseURL + loggedChannel.data.profile_pic}
              sx={{width: 100, height: 100}}
          />
          <input
              style={{display: "none"}}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageInputChange(e, true)}
              ref={profilePictureInputRef}
          />
          <InnerImageUploadContainer>
            <ImageUploadButton
                variant="contained"
                disableTouchRipple
                onClick={() => handleInputClick(true)}
            >
              Upload
            </ImageUploadButton>
            {profilePicture && (
                <FileContentContainer>
                  <FileNameText>{profilePicture.name}</FileNameText>
                  <ImageClearButton disableRipple onClick={() => clearInput(true)}>
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
