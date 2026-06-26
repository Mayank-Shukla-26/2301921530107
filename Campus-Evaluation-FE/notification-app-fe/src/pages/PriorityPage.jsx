import { useState, useEffect } from "react";
import {
  Alert, Box, CircularProgress, Divider,
  MenuItem, Pagination, Select, Stack, Typography
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { fetchNotifications } from "../api/notifications";

const WEIGHT = { Placement: 3, Result: 2, Event: 1 };
const VIEWED_KEY = "viewed_priority";

export function PriorityPage() {
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewed, setViewed] = useState(() =>
    JSON.parse(localStorage.getItem(VIEWED_KEY) || "[]")
  );

  useEffect(() => {
    setLoading(true);
    fetchNotifications({ page: 1, limit: 10, notification_type: filter })
      .then((data) => {
        const scored = (data.notifications ?? []).map((n) => ({
          ...n,
          score: WEIGHT[n.Type] * 1e13 + new Date(n.Timestamp).getTime(),
        }));
        scored.sort((a, b) => b.score - a.score);
        setAll(scored);
        setLoading(false);
        setPage(1);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filter]);

  const totalPages = Math.ceil(all.length / limit);
  const displayed = all.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (displayed.length > 0) {
      const newViewed = [...new Set([...viewed, ...displayed.map((n) => n.ID)])];
      setViewed(newViewed);
      localStorage.setItem(VIEWED_KEY, JSON.stringify(newViewed));
    }
  }, [displayed]);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <StarIcon sx={{ fontSize: 28, color: "#f59e0b" }} />
        <Typography variant="h5" fontWeight={700}>Priority Notifications</Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <NotificationFilter value={filter} onChange={(f) => { setFilter(f); setPage(1); }} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">Top</Typography>
          <Select size="small" value={limit} onChange={(e) => { setLimit(e.target.value); setPage(1); }}>
            {[5, 10, 15, 20].map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      {loading && <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>}
      {!loading && error && <Alert severity="error">Failed to load: {error}</Alert>}
      {!loading && !error && displayed.length === 0 && <Alert severity="info">No notifications found.</Alert>}

      {!loading && !error && displayed.length > 0 && (
        <Stack spacing={1.5}>
          {displayed.map((n) => (
            <NotificationCard key={n.ID} notification={n} isNew={!viewed.includes(n.ID)} />
          ))}
        </Stack>
      )}

      {!loading && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" shape="rounded" />
        </Box>
      )}
    </Box>
  );
}