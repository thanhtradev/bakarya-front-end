import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import AuthContext from "../../../store/auth-context";

const logginedSettings = ["Profile", "Account", "Dashboard"];
const notLogginSetting = [
  { title: "Sign in", link: "/login-page" },
  { title: "Sign up", link: "/signup-page" },
];

const HeaderAvatar = () => {
  const authCtx = React.useContext(AuthContext);
  const isLoggined = authCtx.isLoggedIn;
  const settings = isLoggined ? logginedSettings : notLogginSetting;

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    authCtx.logout();
  };

  const settingList = () => {
    if (settings.length === 2) {
      return settings.map((setting, i) => (
        <MenuItem onClick={handleCloseUserMenu} key={i}>
          <Link
            href={setting.link}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography textAlign='center'>{setting.title}</Typography>
          </Link>
        </MenuItem>
      ));
    } else {
      return settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>{setting}</Typography>
        </MenuItem>
      ));
    }
  };

  return (
    <React.Fragment>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/2.jpg'
            sx={{
              height: "38px",
              width: "38px",
              fontSize: "1.3em",
            }}
          >
            <PersonIcon sx={{ fontSize: "1em" }} />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settingList()}
        {isLoggined && (
          <MenuItem onClick={handleLogOut}>
            <Typography textAlign='center'>Log out</Typography>
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default HeaderAvatar;
