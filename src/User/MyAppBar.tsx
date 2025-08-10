import * as React from "react";
import { AppBar, Logout, UserMenu, useUserMenu } from "react-admin";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SettingsMenuItem = React.forwardRef<HTMLAnchorElement>((props, ref) => {
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<SettingsMenuItem> should be used inside a <UserMenu>");
  }
  const { onClose } = userMenuContext;
  return (
    <>
      <MenuItem
        onClick={onClose}
        ref={ref}
        component={Link}
        to="/change-password"
        {...props}
      >
        <ListItemIcon>
          <PasswordIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Zmien hasło</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={onClose}
        ref={ref}
        component={Link}
        to="/profil"
        {...props}
      >
        <ListItemIcon>
          <AccountBoxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profil</ListItemText>
      </MenuItem>
    </>
  );
});

export const MyAppBar = () => (
  <AppBar
    userMenu={
      <UserMenu>
        <SettingsMenuItem />
        <Logout />
      </UserMenu>
    }
  />
);
