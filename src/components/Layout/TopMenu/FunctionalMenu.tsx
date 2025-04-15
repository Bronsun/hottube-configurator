import { Button, Menu, MenuItem, Stack } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants/routes";
import { useAuth } from "../../../context/Auth/AuthContext";

const FunctionalMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { isUserLogin, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    handleClose();
    navigate(ROUTES.PANEL);
  };

  const handleAccount = () => {
    handleClose();
    navigate(ROUTES.ACCOUNT);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (isUserLogin()) {
    const user = userData();
    return (
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ color: "black" }}
          startIcon={<AccountCircleOutlinedIcon />}
        >
          {user?.given_name} {user?.family_name}
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "user-button",
          }}
        >
          <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
          <MenuItem onClick={handleAccount}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Stack>
    );
  } else {
    return (
      <Button
        variant="outlined"
        color="primary"
        href="/login"
        startIcon={<PersonOutlineIcon />}
        aria-label="Login"
      >
        Login
      </Button>
    );
  }
};

export default FunctionalMenu;
