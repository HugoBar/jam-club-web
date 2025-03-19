import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import { useAuth } from "../auth/AuthProvider";

function UserInfo({ data }) {
  const [showDetails, setShowDetails] = useState(false);
  const { logout } = useAuth();

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLogoutClick = (event) => {
    event.stopPropagation();
    logout();
  };

  if (!data) {
    return null; // or return a placeholder, loading spinner, etc.
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        left: "0",
        backgroundColor: "rgb(35, 36, 36)",
        padding: "0.5rem 1rem",
        borderRadius: "0 0.5rem 0 0", // Only the top right corner is rounded
        boxShadow: 1,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "190px",
      }}
      onClick={handleToggleDetails}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          color="white"
          sx={{ marginRight: "0.5rem", fontFamily: "Roboto, sans-serif" }}
        >
          {data?.nickname || "Convidado"}
        </Typography>
        {showDetails ? (
          <ExpandLessIcon sx={{ color: "white" }} />
        ) : (
          <ExpandMoreIcon sx={{ color: "white" }} />
        )}
      </Box>
      <Collapse in={showDetails}>
        <Box
          sx={{
            borderRadius: "0.5rem",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Roboto, sans-serif",
              color: "rgb(150, 153, 153)",
            }}
          >
            @{data?.username || "Desconhecido"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "0.5rem", fontFamily: "Roboto, sans-serif" }}
          >
            Alterar Palavra-passe (WIP)
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogoutClick}
            sx={{ marginTop: "0.5rem", fontFamily: "Roboto, sans-serif" }}
          >
            Sair
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}

export default UserInfo;
