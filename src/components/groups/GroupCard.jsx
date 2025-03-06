import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function GroupCard({ group }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 150,
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {group.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          {group.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GroupCard;
