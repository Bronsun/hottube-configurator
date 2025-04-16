import { Box } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          flex: 1,
        
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
