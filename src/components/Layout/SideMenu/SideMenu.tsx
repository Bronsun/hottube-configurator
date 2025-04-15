import { ArrowForward, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { LinkItem } from "../../../models/LinkItem";
import { useLocation, Link } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

interface SideMenuProps {
  title: string;
  links: LinkItem[];
}

const SideMenu = ({ title, links }: SideMenuProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  // Determine active link based on current pathname
  const activeLink = links.find((link) => link.path === location.pathname);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 1,
          borderBottom: "1px solid",
          borderColor: activeLink && isMobile ? "primary.main" : "border.main",
          color: activeLink && isMobile ? "primary.main" : "inherit",
          cursor: isMobile ? "pointer" : "default",
        }}
      >
        <Typography
          variant="subtitle2"
          color={isMobile && activeLink ? "primary" : "inherit"}
        >
          {isMobile && activeLink ? activeLink.title : title}
        </Typography>
        {isMobile && (
          <IconButton
            onClick={handleToggle}
            size="small"
            color={isMobile && activeLink ? "primary" : "inherit"}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <CloseIcon fontSize="inherit" />
            ) : (
              <MenuIcon fontSize="inherit" />
            )}
          </IconButton>
        )}
      </Stack>

      {(!isMobile || open) && (
        <Box>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    py: 1,
                    borderBottom: "1px solid",
                    borderColor: isActive ? "primary.main" : "border.main",
                    color: isActive ? "primary.main" : "inherit",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Typography>{link.title}</Typography>
                  <ArrowForward
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </Stack>
              </Link>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SideMenu;
