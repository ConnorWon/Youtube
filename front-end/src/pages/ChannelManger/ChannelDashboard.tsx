import { Avatar, Stack } from "@mui/material";
import {ChangeEvent, useContext, useRef, useState} from "react";
import { FormField } from "../../components/FormField";
import "./Styling.css";
import { UserContext } from "../../contexts/UserContext";
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
import { BACKEND_BASE_URL } from "../../utils/Constants";
import {updateChannel, uploadImageForChannel} from "../../services/channelService";

export const ChannelDashboard = () => {
  const { loggedChannel, setLoggedChannel } = useContext(UserContext);

  const [name, setName] = useState<string>(loggedChannel!.name);
  const [tag, setTag] = useState<string>(loggedChannel!.tag.substring(1));
  const [bannerImage, setBannerImage] = useState<File|null>(null);
  const [profilePicture, setProfilePicture] = useState<File|null>(null);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profilePictureInputRef = useRef<HTMLInputElement>(null);

  const resetFields = () => {
    setTag(loggedChannel!.tag.substring(1));
    setName(loggedChannel!.name);
    profilePictureInputRef.current!.value = '';
    setProfilePicture(null);
    bannerInputRef.current!.value = '';
    setBannerImage(null);
  };

  const updateChannelProfilePicture = async (imageField: string, image: File) => {
    const imgForm = new FormData();
    imgForm.append(imageField, image);
    const response = await uploadImageForChannel(imgForm);
    if (response.status === 200) {
      setLoggedChannel(response.data);
    }
  };

  const updateChannelInfo = async () => {
    const response = await updateChannel(name, tag);
    if (response.status === 200) {
      setLoggedChannel(response.data);
      setName(response.data.name);
      setTag(response.data.tag.substring(1));
    }
    if (bannerImage) {
      await updateChannelProfilePicture("banner", bannerImage);
    }
    if (profilePicture) {
      await updateChannelProfilePicture("profile_pic", profilePicture);
    }
    resetFields();
  };

  const handleInputClick = (isProfileInput: boolean) => {
    if (isProfileInput) {
      profilePictureInputRef.current!.click();
    } else {
      bannerInputRef.current!.click();
    }
  };

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>, isProfileInput: boolean) => {
    if (isProfileInput) {
      setProfilePicture(e.target.files![0]!);
    } else {
      setBannerImage(e.target.files![0]!);
    }
  };

  const clearInput = (isProfileInput: boolean) => {
    if (isProfileInput) {
      profilePictureInputRef.current!.value = '';
      setProfilePicture(null);
    } else {
      bannerInputRef.current!.value = '';
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
            isPassword={false}
          />
        </Stack>
        <Stack className="FormFieldContainer tag-form-field">
          <FieldLabel>Tag</FieldLabel>
          <FormField
            placeholder={"Set Your Tag"}
            value={tag}
            handleValue={setTag}
            startAdornment={"@"}
            isPassword={false}
          />
        </Stack>
        <Stack className="FormFieldContainer">
          <FieldLabel>Channel Banner:</FieldLabel>
          <BannerImage src={BACKEND_BASE_URL + loggedChannel!.banner}/>
          <input
              style={{display: "none"}}
              type="file"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageInputChange(e, false)}
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
              src={BACKEND_BASE_URL + loggedChannel!.profile_pic}
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
            name === loggedChannel!.name &&
            tag === loggedChannel!.tag.substring(1) &&
            (profilePictureInputRef.current?.value === '' || !profilePictureInputRef.current) &&
            (bannerInputRef.current?.value === '' || !bannerInputRef.current)
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
