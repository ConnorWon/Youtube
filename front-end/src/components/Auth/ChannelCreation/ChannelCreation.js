import React, { useContext, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import {
  createChannel,
  getUserChannels,
  setDefaultChannel,
} from "../../../utils/apiRequests";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FormField } from "../FormField";
import { AuthButton, AuthContainer, AuthTitle } from "../Styling";

export const ChannelCreation = () => {
  const { setLoggedChannel, setChannels } = useContext(UserContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState(null);

  const handleCreation = async () => {
    const creationResponse = await createChannel(name, tag);
    if (creationResponse.status !== 201) {
      setError(creationResponse.data);
      return;
    }

    const channelLoginResponse = await setDefaultChannel();
    if (channelLoginResponse.status === 200) {
      setLoggedChannel(channelLoginResponse.data);
    } else {
      console.log(channelLoginResponse.status);
      console.log("Error occured while trying to login to your new channel");
    }

    const channelList = await getUserChannels();
    if (channelList) {
      setChannels(channelList);
    } else {
      console.log(channelList.message);
    }

    navigate("/dashboard");
  };

  return (
    <AuthContainer sx={{ width: "20%" }} spacing={1}>
      <AuthTitle variant="h3">Create Channel</AuthTitle>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <FormField label="Channel Name" handleValue={setName} value={name} />
      <FormField label="Tag" value={tag} handleValue={setTag} />
      <Stack direction="row" spacing={1}>
        <AuthButton variant="contained" fullWidth href={"/dashboard"}>
          Back
        </AuthButton>
        <AuthButton
          variant="contained"
          fullWidth
          disabled={name === "" || tag === ""}
          onClick={() => handleCreation()}
        >
          Create
        </AuthButton>
      </Stack>
    </AuthContainer>
  );
};
