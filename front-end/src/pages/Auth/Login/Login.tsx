import { useContext, useState } from "react";
import { Stack, Typography, styled, Link } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../../components/FormField";
import { AuthButton, AuthContainer, AuthTitle } from "../Styling";
import {getUserChannels, setDefaultChannel} from "../../../services/channelService";
import {login, logout} from "../../../services/authService";

const CreateAccountLink = styled(Link)`
  cursor: pointer;
  width: fit-content;
`;

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    setLoggedChannel,
    setChannels,
    resetContext,
  } = useContext(UserContext);

  const handleLogin = async () => {
    const loginResponse = await login(email, password);
    if (loginResponse.status === 200) {
      setIsLoggedIn(true);
    } else if (loginResponse.status === 400) {
      setError(loginResponse.data);
      return;
    } else {
      setError("Something went wrong during login. Please try again.");
      return;
    }

    const channelLoginResponse = await setDefaultChannel();
    if (channelLoginResponse.status === 200) {
      setLoggedChannel(channelLoginResponse.data);
    } else {
      setError("An error occurred while trying to log you in. Please try again");
      await handleLoginError();
      return;
    }

    const channelList = await getUserChannels();
    if (channelList.length > 0) {
      setChannels(channelList);
    } else {
      setError("An error occurred while trying to log you in. Please try again");
      await handleLoginError();
      return;
    }

    navigate("/");
  };

  // if error occurs in handleLogin post login, then this will log out before completing login process
  const handleLoginError = async () => {
    for (let i = 5; i > 0; i--) {
      const logoutResponse = await logout();
      if (logoutResponse.status === 200) {
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
