import React, { useState } from "react";
import { Button } from "@mui/material";
import SpeakerIcon from '@mui/icons-material/Speaker';

function OpenTrackButton({ url }) {
  return (
    <Button
      sx={{ maxWidth: 20, height: 20 }}
      onClick={() => window.open(url, "_blank")}
    >
      <SpeakerIcon />
    </Button>
  );
}

export default OpenTrackButton;
