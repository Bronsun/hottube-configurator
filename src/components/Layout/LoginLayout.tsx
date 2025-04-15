import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid2";
import { Outlet } from "react-router";
import loginHero from "../../assets/login-hero.jpeg";

const LoginLayout = () => {
  const navbarHeight = 64;
  return (
    <>
      <Navbar />
      <Grid container>
        {/* Left column: Hero image (hidden on xs screens) */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{
            display: { xs: "none", md: "block" },
            backgroundImage: `url(${loginHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        />

        {/* Right column: Content */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            height: `calc(100vh - ${navbarHeight}px)`,
            overflowY: "auto",
          }}
        >
          <Container>
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginLayout;
