import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

function LogoBar() {
  return (
    <AppBar
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LibraryMusicIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JAM-CLUB
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LogoBar;
