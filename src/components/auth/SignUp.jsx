import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card } from "../shared/FormCard";
import { AuthContainer } from "../shared/AuthContainer";
import AppTheme from "../../theme/AppTheme";
import ColorModeSelect from "../../theme/ColorModeSelect";
import { registerRequest } from "../../utils/authRequests";

function SignUp(props) {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");

  const validateInputs = () => {
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    const nickname = document.getElementById("nickname");

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Palavra-passe tem de ser maior que 6 caracteres."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!username.value || username.value.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage("Utilizador é obrigatório.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!nickname.value || nickname.value.length < 1) {
      setNicknameError(true);
      setNicknameErrorMessage("Nickname é obrigatório.");
      isValid = false;
    } else {
      setNicknameError(false);
      setNicknameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const nickname = data.get("nickname");
    const password = data.get("password");

    try {
      const result = await registerRequest(username, nickname, password);
      navigate("/login", { state: { registrationSuccess: true } }); // Redirect or show success message
    } catch (error) {
      if (error.message.includes("Nickname")) {
        setNicknameError(true);
        setNicknameErrorMessage("Nickname já existe.");
      } else if (error.message.includes("Username")) {
        setUsernameError(true);
        setUsernameErrorMessage("Utilizador já existe.");
      }
      console.error(
        "There was a problem with the signup request:",
        error.message
      );
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <AuthContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Registo
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Utilizador</FormLabel>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                placeholder="BigPoppa123"
                error={usernameError}
                helperText={usernameErrorMessage}
                color={usernameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Palavra-passe</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="•••••••••"
                type="password"
                id="password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nickname">Nickname</FormLabel>
              <TextField
                name="nickname"
                required
                fullWidth
                id="nickname"
                placeholder="TheNotoriousBIG"
                error={nicknameError}
                helperText={nicknameErrorMessage}
                color={nicknameError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Confirmar
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>ou</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Já tens uma conta?{" "}
              <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </AuthContainer>
    </AppTheme>
  );
}

export default SignUp;
