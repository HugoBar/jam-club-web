import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card } from "../shared/FormCard";
import { AuthContainer } from "../shared/AuthContainer";
import AppTheme from "../../theme/AppTheme";
import { loginRequest } from "../../utils/authRequests";
import { useAuth } from "./AuthProvider";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility

  const validateInputs = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let isValid = true;

    if (!username.value) {
      setUsernameError(true);
      setUsernameErrorMessage("Utilizador é obrigatório.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

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

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    try {
      const result = await loginRequest(username, password);
      login(result.userId, result.accessToken);
    } catch (error) {
      setUsernameError(true);
      setPasswordError(true);
      setUsernameErrorMessage("Alguma coisa falhou, tenta outra vez!");

      console.error("There was a problem with the login request:", error);
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Utilizador</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                name="username"
                placeholder="kdot87"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Palavra-passe</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Ainda não tens conta?{" "}
              <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
                Registo
              </Link>
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Não te lembras da tua palavra-passe?{" "}
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: "center" }}
                onClick={() => setShowAlert(true)}
              >
                Pena, ainda não temos essa funcionalidade.
              </Link>
            </Typography>
          </Box>
        </Card>
        {showAlert && (
          <Alert severity="warning" onClose={() => setShowAlert(false)}>
            <AlertTitle>ALERTA BURRO</AlertTitle>
            Não sabes ler? Eu disse que não funciona.
          </Alert>
        )}
      </AuthContainer>
    </AppTheme>
  );
}

export default Login;
