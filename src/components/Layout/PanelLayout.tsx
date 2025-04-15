import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid2";
import Footer from "./Footer";
import DynamicBreadcrumbs from "../atomic/Breadcrumbs/DynamicBreadcrumbs";
import SideMenu from "./SideMenu/SideMenu";
import { Outlet } from "react-router";
import { SideMenuItems } from "../../constants/routes";

const PanelLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container sx={{ mt: 5, mb: 2 }} fixed>
        <Grid container spacing={6}>
          <Grid size={{xs:12,md:3}}>
            <SideMenu
              links={SideMenuItems}
              title="Settings"
            />
          </Grid>
          <Grid size={{xs:12,md:9}} sx={{ minWidth: "70%" }}>
            <DynamicBreadcrumbs />
                <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default PanelLayout;
