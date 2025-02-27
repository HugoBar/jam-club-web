import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Table, TableBody } from '@mui/material';
import InviteCard from './InviteCard';
import { userInvitesReceived } from '../../utils/userRequests';
import { acceptGroupInvite, rejectGroupInvite } from '../../utils/groupRequests';

function InviteList({ onHasInvites, onInviteReply }) {
  const [invites, setInvites] = useState([]);
  const loggedInUser = localStorage.getItem('loggedInUser');

  const fetchInvites = async () => {
    const receivedInvites = await userInvitesReceived(loggedInUser, { status: "pending" }); 
    setInvites(receivedInvites);
    onHasInvites(receivedInvites.length > 0); 
  };

  useEffect(() => {
    fetchInvites();
  }, [onHasInvites]);

  const handleAccept = async (groupId, inviteId) => {
    await acceptGroupInvite(groupId, inviteId);
    fetchInvites();
    onInviteReply();
  };

  const handleDecline = async (groupId, inviteId) => {
    await rejectGroupInvite(groupId, inviteId, "declined");
    fetchInvites();
    onInviteReply();
  };

  if (invites.length === 0) return null; 

  return (
    <Box
      sx={{
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        '@media (max-width: 768px)': {
          width: '100%', 
        },
      }}
    >
      <Card sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Convites pendentes
        </Typography>
        <Table size="small">
          <TableBody>
            {invites.map((invite) => (
              <InviteCard key={invite._id} invite={invite} onAccept={handleAccept} onDecline={handleDecline} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}

export default InviteList;
