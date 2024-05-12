import { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../../components/FormField";
import { AuthButton, AuthContainer, AuthTitle } from "../Styling";
import {createChannel, getUserChannels, setDefaultChannel} from "../../../services/channelService";

export const ChannelCreation = () => {
  const { setLoggedChannel, setChannels } = useContext(UserContext);

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCreation = async () => {
    const creationResponse = await createChannel(name, tag);
    if (creationResponse.status === 201) {
      setLoggedChannel(creationResponse.data);
    } else {
      setError("An error occurred while trying to create your channel. Please try again");
    }

    const channelLoginResponse = await setDefaultChannel();
    if (channelLoginResponse.status === 200) {
      setLoggedChannel(channelLoginResponse.data);
    }

    const channelList = await getUserChannels();
    setChannels(channelList);

    navigate("/dashboard");
  };

  return (
    <AuthContainer sx={{ width: "20%" }} spacing={1}>
      <AuthTitle variant="h3">Create Channel</AuthTitle>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <FormField label="Channel Name" handleValue={setName} value={name} />
      <FormField label="Tag" value={tag} handleValue={setTag} />
      <Stack direction="row" spacing={1}>
        <AuthButton variant="contained" fullWidth href={"/account"}>
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
