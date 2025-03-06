import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { inviteToGroup } from "../../utils/groupRequests";

const GroupInviteDialog = ({ open, onClose, groupId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleInvite = async () => {
    try {
      await inviteToGroup(groupId, username);
      setError("");
      onClose();
    } catch (error) {
      console.error("Error inviting user:", error);
      switch (error.message) {
        case "User is already a member of the group":
          setError("Utilizador já é membro do grupo.");
          break;
        case "User already has an invite":
          setError("Utilizador já tem um convite pendente.");
          break;
        default:
          setError("Não foi possível convidar o utilizador.");
          break;
      }
    }
  };

  const handleClose = () => {
    setUsername("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Convida um novo membro</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleInvite} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupInviteDialog;
