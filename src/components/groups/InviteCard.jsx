import React from 'react';
import { TableCell, TableRow, IconButton, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { keyframes } from '@mui/system';

// Keyframes for scrolling text animation
const scrollText = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

function InviteCard({ invite, onAccept, onDecline }) {
  return (
    <TableRow sx={{ height: 50 }}>
      {/* Invite Name Container */}
      <TableCell sx={{ maxWidth: 150, overflow: 'hidden', position: 'relative' }}>
        <Box
          sx={{
            width: '100%', 
            display: 'flex', 
            alignItems: 'center',
            height: 30, 
            overflow: 'hidden',
            position: 'relative',
            whiteSpace: 'nowrap',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              minWidth: '100%', 
              animation: invite.group.length > 12 ? `${scrollText} 5s linear infinite` : 'none',
            }}
          >
            <Typography variant="body1">{invite.group.name}</Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Action Buttons */}
      <TableCell align="right" sx={{ width: 60, minWidth: 60 }}>
        <IconButton size="small" color="success" onClick={() => onAccept(invite.group._id, invite._id)}>
          <CheckIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => onDecline(invite.group._id, invite._id)}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default InviteCard;
