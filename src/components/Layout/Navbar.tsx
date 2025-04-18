import { AppBar, Box, Container, Link, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { useEffect } from 'react';
import { loadHottubes } from '../../utils/hottubes';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Initial load - respects the current language instead of forcing Polish
  useEffect(() => {
    const initialLoad = async () => {
      try {
        // Load hottubes data with current language
        await loadHottubes();
      } catch (error) {
        console.error('Failed to load initial hottub data:', error);
      }
    };
    
    initialLoad();
  }, []);

  return (
    <AppBar 
      sx={{
        backgroundColor: "white",
        position: 'static',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            py: isMobile ? 1 : 0
          }}
        >
          <Link component={RouterLink} to={ROUTES.HOME} sx={{ textDecoration: 'none' }}>
            <Box 
              component="img" 
              src="/MountSpa-logo.png" 
              alt="Mount Spa Logo" 
              sx={{ 
                height: isMobile ? 60 : 80,
                mr: isMobile ? 0 : 2,
              }} 
            />
          </Link>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            color: theme.palette.text.primary,
            fontSize: '0.9rem',
            mt: isMobile ? 1 : 0,
            mb: isMobile ? 1 : 0
          }}>
            <Box sx={{ 
              fontWeight: 'bold', 
              mr: 1,
              mb: isMobile ? 0.5 : 0,
              textAlign: isMobile ? 'center' : 'left',
              width: isMobile ? '100%' : 'auto'
            }}>
              Skontaktuj się z nami:
            </Box>
            <Link 
              href="mailto:info@mountspa.pl" 
              sx={{ 
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                mx: 1
              }}
            >
              info@mountspa.pl
            </Link>
            <Box sx={{ 
              mx: 0.5,
              display: isMobile ? 'none' : 'block'
            }}>|</Box>
            <Link 
              href="tel:+48502291397" 
              sx={{ 
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                ml: isMobile ? 0 : 1
              }}
            >
              +48 502 291 397
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
