import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FormField } from "../../../components/FormField";
import { colors } from "../../../utils/ColorThemes";
import { updateChannel } from "../../../utils/apiRequests";
import { UserContext } from "../../../contexts/UserContext";

const ActivationDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    width: 738px;
    background-color: ${colors.dropDownMenu};
  }
`;

const ContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: unset;
  margin-top: 20px;
`;

const DialogButton = styled(Button)`
  color: white;
  border-radius: 16px;
  padding-right: 16px;
  padding-left: 16px;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const UpdateChannelDialog = (props) => {
  const { open, handleClose } = props;
  const { loggedChannel } = useContext(UserContext);

  const [name, setName] = useState(loggedChannel.data.name);
  const [tag, setTag] = useState(loggedChannel.data.tag);

  const handleActivateChannel = async () => {
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
    <ActivationDialog open={open} handleClose={handleClose}>
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
