import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";
import { removeFromGroup } from "../../utils/groupRequests";

const GroupKickDialog = ({ open, onClose, groupId, member, onNewMemberList }) => {
  const handleRemoval = async () => {
    try {
      await removeFromGroup(groupId, member._id);
      onClose();
      onNewMemberList();
    } catch (error) {
      console.error("Error removing user from group:", error);
    }
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmar remoção</DialogTitle>
        <DialogContent>
          <Typography>
            Tem a certeza que deseja remover {member?.nickname} do grupo?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemoval} color="error">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default GroupKickDialog;
