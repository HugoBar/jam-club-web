import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createUserRecommendation } from "../../utils/recommendationRequests";

function RecommendationForm({ groupId, onNewRecommendation }) {
  // TODO REMOVE LATER
  const spotifyId = "6fvZwoOMEMy2LBbLtdznHE";

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
    </Stack>
  );
}

export default RecommendationForm;
