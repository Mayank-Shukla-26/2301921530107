import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size="small"
      sx={{ flexWrap: "wrap", gap: 0.5 }}
      onChange={(_, newFilter) => {
        if (newFilter !== null) onChange(newFilter);
      }}
    >
      {filters.map((type) => (
        <ToggleButton value={type} sx={{ textTransform: "none", px: 2 }} key={type}>
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}