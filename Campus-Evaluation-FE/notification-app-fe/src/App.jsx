import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityPage } from "./pages/PriorityPage";

function App() {
  const [page, setPage] = useState("all");

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Campus Notifications</Typography>
          <Button color="inherit" onClick={() => setPage("all")}>All</Button>
          <Button color="inherit" onClick={() => setPage("priority")}>Priority</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", pt: 2 }}>
        {page === "all" ? <NotificationsPage /> : <PriorityPage />}
      </Box>
    </>
  );
}

export default App;