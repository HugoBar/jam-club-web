import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { inviteToGroup, removeFromGroup } from "../../utils/groupRequests";
import RemoveIcon from "@mui/icons-material/Remove";

const GroupMembersList = ({ group, onNewMemberList }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [username, setUsername] = useState("");
  const [error, setError] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInvite = async () => {
    try {
      await inviteToGroup(group._id, username);
      setError("");
      handleCloseDialog();
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

  const handleRemoveFromGroup = (member) => {
    setSelectedMember(member);
    setOpenConfirmDialog(true);
  };

  const confirmRemove = async () => {
    try {
      await removeFromGroup(group._id, selectedMember._id);

      setOpenConfirmDialog(false);
      onNewMemberList();
    } catch (error) {
      console.error("Error removing user from group:", error);
    }
  };

  const cancelRemove = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10px"
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Membros
        </Typography>
        <Button variant="contained" size="small" onClick={handleOpenDialog}>
          <PersonAddIcon />
        </Button>
      </Box>
      <Table>
        <TableBody>
          {group.members.map((member) => (
            <TableRow key={member._id}>
              <TableCell>
                <Typography>{member.nickname}</Typography>
              </TableCell>
              <TableCell align="right">
                {member._id === group.owner && (
                  <Typography sx={{ fontSize: "11px", fontWeight: "bold" }}>
                    ADMIN
                  </Typography>
                )}
                {member._id === loggedInUser && (
                  <Typography sx={{ fontSize: "11px", fontWeight: "bold" }}>
                    TÚ
                  </Typography>
                )}
                {member._id !== loggedInUser && member._id !== group.owner && (
                  <Button
                    onClick={() => handleRemoveFromGroup(member)}
                    color="error"
                  >
                    <RemoveIcon />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleInvite} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={cancelRemove}>
        <DialogTitle>Confirmar remoção</DialogTitle>
        <DialogContent>
          <Typography>
            Tem a certeza que deseja remover {selectedMember?.nickname} do
            grupo?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRemove} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmRemove} color="error">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupMembersList;
