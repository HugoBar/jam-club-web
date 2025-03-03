import React, { useState } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { removeFromGroup } from "../../utils/groupRequests";
import { useNavigate } from "react-router-dom";

const GroupSettings = ({ group }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-menu" : undefined;

  const options = [
    { label: "Edit Group", onClick: () => console.log("Editing Group") },
    { label: "Leave Group", onClick: () => setOpenDialog(true) },
  ];

  const handleLeaveGroup = async () => {
    try {
      await removeFromGroup(group._id, loggedInUser);
      setOpenDialog(false);
      navigate("/");
    } catch (error) {
      console.error("Error removing from group:", error);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem button onClick={handleLeaveGroup}>
            <ListItemText primary={"Sair do grupo"} />
          </ListItem>
        </List>
      </Popover>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Tens a certeza que queres deixar o grupo?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            {"NÃO!"}
          </Button>
          <Button onClick={handleLeaveGroup} color="primary">
            {"SIM... :("}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupSettings;
