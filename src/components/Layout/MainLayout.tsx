import { Box } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import CookieConsent from '../common/CookieConsent/CookieConsent';

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
      <CookieConsent />
    </>
  );
};

export default MainLayout;
