import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RemoveIcon from "@mui/icons-material/Remove";
import GroupInviteDialog from "./GroupInviteDialog";
import GroupKickDialog from "./GroupKickDialog";

function GroupMembersList({ group, onNewMemberList }) {
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openKickDialog, setOpenKickDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleRemoveFromGroup = (member) => {
    setSelectedMember(member);
    setOpenKickDialog(true);
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
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenInviteDialog(true)}
        >
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

      <GroupInviteDialog
        open={openInviteDialog}
        onClose={() => setOpenInviteDialog(false)}
        groupId={group._id}
      />

      <GroupKickDialog
        open={openKickDialog}
        onClose={() => setOpenKickDialog(false)}
        groupId={group._id}
        member={selectedMember}
        onNewMemberList={onNewMemberList}
      />
    </Box>
  );
}

export default GroupMembersList;
