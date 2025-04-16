import { AppBar, Box, Container, Link, Toolbar, useTheme} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../../constants/routes';
import {  useEffect } from 'react';
import { loadHottubes } from '../../utils/hottubes';

const Navbar = () => {
  const theme = useTheme();

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
        backgroundColor:"white",
        position:'static',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link component={RouterLink} to={ROUTES.HOME} sx={{ textDecoration: 'none' }}>
            <Box 
              component="img" 
              src="/src/assets/MountSpa-logo.png" 
              alt="Mount Spa Logo" 
              sx={{ 
                height: 80, 
                mr: 2,
              }} 
            />
          </Link>
          
        
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
