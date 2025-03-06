import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createGroup } from "../../utils/groupRequests";

function FormDialog({ open, close, onGroupCreated }) {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!groupName.trim()) {
      setError("O nome do grupo é obrigatório.");
      return;
    }

    try {
      await createGroup(groupName);
      onGroupCreated();
      setGroupName("");
      setError("");
      close();
    } catch (error) {
      console.error("Error creating group:", error);
      setError("Erro ao criar o grupo. Tente novamente.");
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Criar grupo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Introduza o nome do grupo que deseja criar.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="groupName"
            label="Nome do grupo"
            fullWidth
            variant="standard"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button type="submit">Criar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
