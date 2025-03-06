import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createUserRecommendation } from "../../utils/recommendationRequests";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

function RecommendationForm({ groupId, onNewRecommendation }) {
  // TODO REMOVE LATER
  const spotifyId = "6fvZwoOMEMy2LBbLtdznHE";
  const [result, setResult] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUserRecommendation(groupId, spotifyId);
      onNewRecommendation();
    } catch (error) {
      console.error("Error creating recommendation:", error);
    }
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="text" onClick={handleSubmit}>
        Text
      </Button>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => setResult(e.target.value)}/>
      <Typography>{result}</Typography>
    </Stack>
  );
}

export default RecommendationForm;
