import { Box, Container, Grid, Link, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Mount SPA
            </Typography>
            <Typography variant="body2">
              Premium hot tubs for the ultimate relaxation experience.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              © {currentYear} Mount SPA. All rights reserved.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" gutterBottom>
              Products
            </Typography>
            <Link
              component={RouterLink}
              to="/configurator"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              All Hot Tubs
            </Link>
            <Link
              component={RouterLink}
              to="/collections/utopia"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              Utopia Collection
            </Link>
            <Link
              component={RouterLink}
              to="/collections/paradise"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              Paradise Collection
            </Link>
            <Link
              component={RouterLink}
              to="/collections/vacanza"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              Vacanza Collection
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" gutterBottom>
              Company
            </Typography>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              About Us
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              Contact
            </Link>
            <Link
              component={RouterLink}
              to="/dealers"
              color="inherit"
              sx={{ 
                display: 'block', 
                mb: 1,
                '&:hover': { 
                  color: theme.palette.primary.light 
                } 
              }}
            >
              Find a Dealer
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom>
              Connect With Us
            </Typography>
            <Typography variant="body2" paragraph>
              Subscribe to our newsletter for the latest updates and offers.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              {/* Form elements could be added here */}
              <Typography variant="body2">
                Email: info@mountspa.com
              </Typography>
              <Typography variant="body2">
                Phone: (555) 123-4567
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
