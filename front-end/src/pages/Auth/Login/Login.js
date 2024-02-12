import React, { useContext, useState } from "react";
import { Button, Stack, Typography, styled, Link } from "@mui/material";
import {
  getUserChannels,
  login,
  logout,
  setDefaultChannel,
} from "../../../utils/apiRequests";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../../components/FormField";
import { AuthButton, AuthContainer, AuthTitle } from "../Styling";

const CreateAccountLink = styled(Link)`
  cursor: pointer;
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    setUser,
    setLoggedChannel,
    setChannels,
    resetContext,
  } = useContext(UserContext);

  const handleLogin = async () => {
    const loginResponse = await login(email, password);
    if (loginResponse.status === 200) {
      setIsLoggedIn(true);
      setUser(loginResponse.data["id"]);
    } else {
      setError(loginResponse.data);
      return;
    }

    const channelLoginResponse = await setDefaultChannel();
    if (channelLoginResponse.status === 200) {
      setLoggedChannel(channelLoginResponse.data);
    } else {
      console.log(channelLoginResponse.status);
      console.log("error occured while trying to log your channel");
      setError("An error occured while trying to log you in. Please try again");
      handleLoginError();
      return;
    }

    const channelList = await getUserChannels();
    if (channelList) {
      setChannels(channelList);
    } else {
      setError("An error occured while trying to log you in. Please try again");
      handleLoginError();
      return;
    }

    navigate("/");
  };

  // if error occurs in handleLogin post login, then this will logout before completing login process
  const handleLoginError = () => {
    for (var i = 5; i > 0; i--) {
      const logoutResponse = logout();
      if (logoutResponse) {
        resetContext();
        return;
      }
    }
  };

  return (
    <AuthContainer sx={{ width: "20%" }} spacing={1}>
      <AuthTitle variant="h3">Login</AuthTitle>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <FormField label="Email" handleValue={setEmail} value={email} />
      <FormField
        label="Password"
        isPassword={true}
        value={password}
        handleValue={setPassword}
      />
      <Stack direction="row" spacing={1}>
        <AuthButton variant="contained" fullWidth href="/">
          Back
        </AuthButton>
        <AuthButton
          variant="contained"
          fullWidth
          disabled={email === "" || password === ""}
          onClick={() => handleLogin()}
        >
          Login
        </AuthButton>
      </Stack>
      <CreateAccountLink href="/signup">Create an account</CreateAccountLink>
    </AuthContainer>
  );
};
