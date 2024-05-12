import {DialogActions, DialogTitle} from "@mui/material";
import {FC, useContext, useState} from "react";
import { FormField } from "../../../components/FormField";
import { UserContext } from "../../../contexts/UserContext";
import {updateChannel} from "../../../services/channelService";
import {ActivationDialog, ContentContainer, DialogButton} from "./Styling";

export const ChannelActivationDialog: FC<{open: boolean, handleClose: () => void}> = (props) => {
  const { open, handleClose } = props;
  const { loggedChannel, setLoggedChannel } = useContext(UserContext);

  const [name, setName] = useState<string>(loggedChannel!.name);
  const [tag, setTag] = useState<string>(loggedChannel!.tag);

  const handleActivateChannel = async () => {
    const response = await updateChannel(name, tag);
    if (response.status === 200) {
      setLoggedChannel(response.data)
      handleClose()
    } else if (response.status === 400) {
      console.log(
        "Could not activate your channel. Status Code: " +
          response.status.toString()
      );
    }
  };

  return (
    <ActivationDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: "white" }}>Activate Your Channel</DialogTitle>
      <ContentContainer>
        <FormField label="Name" value={name} handleValue={setName} />
        <FormField label="Tag" value={tag} handleValue={setTag} />
      </ContentContainer>
      <DialogActions>
        <DialogButton onClick={handleClose}>Cancel</DialogButton>
        <DialogButton onClick={handleActivateChannel}>Update</DialogButton>
      </DialogActions>
    </ActivationDialog>
  );
};
