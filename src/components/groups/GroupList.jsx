import React, { useState, useEffect } from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupForm from "./GroupForm";
import { getUserGroups } from "../../utils/groupRequests";
import GroupCard from "./GroupCard";
import InviteList from "./InviteList";
import { useNavigate } from "react-router-dom";

function GroupList() {
  const [open, setOpen] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [hasInvites, setHasInvites] = useState(true);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUserGroups = async () => {
    try {
      const response = await getUserGroups();
      setUserGroups(response || []);
    } catch (error) {
      console.error("Error fetching user groups:", error);
    }
  };

  const handleGroupClick = (group) => {
    navigate(`/${group.name}`, { state: { groupId: group._id } });
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchUserGroups();
    }
  }, [loggedInUser]);

  return (
    <Box sx={{ width: "100%", maxWidth: 1032, margin: "0 auto", marginTop: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
        Os meus grupos
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            flex: 1,
            gap: 2,
            minWidth: 0,
            "@media (max-width: 1024px)": {
              gridTemplateColumns: "repeat(4, minmax(130px, 1fr))",
            },
            "@media (max-width: 768px)": {
              gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
            },
            "@media (max-width: 480px)": {
              gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
            },
          }}
        >
          {userGroups.map((group) => (
            <a key={group._id} onClick={() => handleGroupClick(group)}>
              <GroupCard key={group._id} group={group} />
            </a>
          ))}

          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 120,
            }}
          >
            <IconButton onClick={handleClickOpen}>
              <AddIcon fontSize="large" />
            </IconButton>
            <GroupForm
              open={open}
              close={handleClose}
              onGroupCreated={fetchUserGroups}
            />
          </Card>
        </Box>

        <InviteList
          onHasInvites={setHasInvites}
          onInviteReply={fetchUserGroups}
        />
      </Box>
    </Box>
  );
}

export default GroupList;
