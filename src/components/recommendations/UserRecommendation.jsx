import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { getGroupRecommendationByUser } from "../../utils/recommendationRequests";
import placeholder from "../../assets/track-placeholder.png";
import RecommendationForm from "./RecommendationForm";

function UserRecommendation({ groupId, onNewRecommendation }) {
  const theme = useTheme();
  const [recommendation, setRecommendation] = useState(null);
  const [hasRecommendation, setHasRecommendation] = useState(false);

  const fetchUserRecommendation = async () => {
    try {
      const response = await getGroupRecommendationByUser(groupId);
      setRecommendation(response);
      setHasRecommendation(true);
    } catch (error) {
      console.error("Error fetching user recommendation:", error);
      setHasRecommendation(false);
    }
  };

  const handleNewRecommendation = () => {
    onNewRecommendation();
    fetchUserRecommendation();
  };

  useEffect(() => {
    fetchUserRecommendation();
  }, [hasRecommendation]);

  return (
    <Card sx={{ display: "flex", height: 160 }}>
      {recommendation ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {recommendation.name}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {recommendation.artists.join(", ")}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                <SkipNextIcon />
              </IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={recommendation.cover[0].url}
            alt="Live from space album cover"
          />
        </>
      ) : (
        <>
          <RecommendationForm
            groupId={groupId}
            onNewRecommendation={handleNewRecommendation}
          ></RecommendationForm>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography component="div" variant="h5">
              Sem recomendação
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
}

export default UserRecommendation;
