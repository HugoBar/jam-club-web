import React, { useState, useEffect } from "react";
import { getGroupById } from "../utils/groupRequests";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SimpleSlider from "./recommendations/Slider";
import UserRecommendation from "./recommendations/UserRecommendation";
import { getGroupRecommendations } from "../utils/recommendationRequests";
import GroupSettings from "./recommendations/GroupSettings";
import GroupListTable from "./groups/GroupMembersList";

function MusicRoom() {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [groupId, setGroupId] = useState(location.state?.groupId);
  const [groupRecommendations, setGroupRecommendations] = useState(null);

  const fetchGroupRecommendations = async () => {
    try {
      const response = await getGroupRecommendations(groupId);
      setGroupRecommendations(response);
    } catch (error) {
      console.error("Error fetching group recommendation:", error);
    }
  };

  const fetchGroup = async () => {
    try {
      const response = await getGroupById(groupId);
      setGroup(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setGroup(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!groupId) return;
    fetchGroup();
    fetchGroupRecommendations();
  }, [groupId]);

  if (loading || !group) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          paddingTop: "5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon
              sx={{ cursor: "pointer", marginRight: 1 }}
              onClick={() => window.history.back()}
            />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {group.name}
            </Typography>
          </Box>

          <GroupSettings group={group} />
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "left" }}
          >
            A minha recomendação
          </Typography>
          <UserRecommendation
            groupId={groupId}
            onNewRecommendation={fetchGroupRecommendations}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "left", marginTop: "20px" }}
          >
            Recomendações do grupo
          </Typography>
          <SimpleSlider items={groupRecommendations} />
        </Box>
      </Box>

      <Box
        sx={{
          width: "300px",
          position: "fixed",
          top: "10%",
          right: 0,
          marginRight: "5%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#fff",
          display: { xs: "none", sm: "block" },
        }}
      >
        <GroupListTable group={group} onNewMemberList={fetchGroup} />
      </Box>

      <Box
        sx={{
          width: "100%",
          padding: "20px",
          display: { xs: "block", sm: "none" },
          marginTop: "20px",
        }}
      >
        <GroupListTable group={group} />
      </Box>
    </>
  );
}

export default MusicRoom;
