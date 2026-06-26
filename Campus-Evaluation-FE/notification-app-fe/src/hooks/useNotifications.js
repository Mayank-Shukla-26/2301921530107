import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(filter = "All", page = 1) {
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNotifications({ page, limit: 10, notification_type: filter })
      .then((data) => {
        setNotifications(data.notifications ?? []);
        setTotalPages(Math.ceil((data.total ?? 10) / 10));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filter, page]);

  return { notifications, totalPages, loading, error };
}