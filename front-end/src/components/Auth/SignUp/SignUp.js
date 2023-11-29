import { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormField } from "../FormField";
import { AuthButton, AuthContainer, AuthTitle } from "../Styling";
import { UserContext } from "../../../contexts/UserContext";
import {
  createBaseChannel,
  login,
  signUp,
  getUserChannels,
} from "../../../utils/apiRequests";

export const SignUp = () => {
  const { setIsLoggedIn, setUser, setChannels } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState([]);

  const handleSignUp = async () => {
    if (confirm != password) {
      setError("Passwords don't match");
      return;
    }

    const signUpResponse = await signUp(email, password);
    if (signUpResponse.status !== 201) {
      setError(signUpResponse.data["email"]);
      return;
    }

    const loginResponse = await login(email, password);
    if (loginResponse.status === 200) {
      setIsLoggedIn(true);
      setUser(loginResponse.data["id"]);
    } else {
      setError(loginResponse.data);
      return;
    }

    const createChannelResponse = await createBaseChannel(email);
    if (createChannelResponse.status !== 201) {
      setError(createChannelResponse.data);
      return;
    }

    const channelList = getUserChannels();
    if (channelList) {
      setChannels(channelList);
    } else {
      setError("Error occured while signing you up");
      return;
    }

    navigate("/");
  };

  return (
    <AuthContainer spacing={1}>
      <AuthTitle variant="h3">Create Your Account</AuthTitle>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <FormField label="Email" value={email} handleValue={setEmail} />
      <FormField
        label="Password"
        isPassword={true}
        value={password}
        handleValue={setPassword}
      />
      <FormField
        label="Confirm Password"
        isPassword={true}
        value={confirm}
        handleValue={setConfirm}
      />
      <Stack direction="row" spacing={1}>
        <AuthButton variant="contained" fullWidth href="/login">
          Back to Login
        </AuthButton>
        <AuthButton
          variant="contained"
          disabled={email === "" || password === "" || confirm === ""}
          fullWidth
          onClick={() => handleSignUp()}
        >
          Register
        </AuthButton>
      </Stack>
    </AuthContainer>
  );
};
