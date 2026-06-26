import { Box, Chip, Typography, Paper } from "@mui/material";

const typeColors = {
  Placement: "success",
  Result: "primary",
  Event: "warning",
};

export function NotificationCard({ notification, isNew }) {
  return (
    <Paper
      elevation={isNew ? 4 : 1}
      sx={{
        p: 2,
        borderLeft: isNew ? "4px solid #1976d2" : "4px solid #e0e0e0",
        backgroundColor: isNew ? "#f0f7ff" : "#fff",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Chip label={notification.Type} color={typeColors[notification.Type] || "default"} size="small" />
          {isNew && <Chip label="New" color="info" size="small" />}
        </Box>
        <Typography variant="caption" color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </Box>
      <Typography variant="body1" mt={1} fontWeight={isNew ? 600 : 400}>
        {notification.Message}
      </Typography>
    </Paper>
  );
}