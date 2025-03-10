import React, { useState } from "react";
import { Fab, Typography, ClickAwayListener, Paper, Link } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";

function BugReportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000, 
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <BugReportIcon />
      </Fab>

      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: 80,
              right: 20,
              width: 200,
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" fontWeight="bold">Reportar Bug</Typography>
            <Typography variant="body2" color="textSecondary">
              Encontraste algum problema? Ajuda-nos a melhorar! UWU
            </Typography>
            <Link href={process.env.BUG_REPORT_LINK} target="_blank" underline="hover" sx={{ display: "block", mt: 1 }}>
              Enviar relatório
            </Link>
          </Paper>
        </ClickAwayListener>
      )}
    </>
  );
}

export default BugReportButton;
