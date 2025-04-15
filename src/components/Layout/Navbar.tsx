import { useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavigationMenu from "./TopMenu/NavigationMenu";
import LinkImage from "../atomic/Image/LinkImage";
import DrawerMenu from "./TopMenu/DrawerMenu";
import { NavigationMenuItems } from "../../constants/routes";
import FunctionalMenu from "./TopMenu/FunctionalMenu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Box
      component="nav"
      sx={{
        p: 1,
        borderBottom: "1px solid",
        borderColor: "border.main",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <LinkImage />
          {!isMobile && <NavigationMenu links={NavigationMenuItems} />}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <FunctionalMenu />
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerMenu links={NavigationMenuItems} onClose={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
};

export default Navbar;
