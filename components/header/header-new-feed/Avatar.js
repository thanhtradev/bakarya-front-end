import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import AuthContext from "../../../store/auth-context";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const logginedSettings = [
  { title: "Profile", link: "/personal-profile" },
  { title: "Account", link: "/#" },
  { title: "Dashboard", link: "/#" },
];
const notLogginSetting = [
  { title: "Sign in", link: "/login-page" },
  { title: "Sign up", link: "/signup-page" },
];

const HeaderAvatar = () => {
  const router = useRouter();
  const authCtx = React.useContext(AuthContext);
  const isLoggined = authCtx.isLoggedIn;
  const settings = isLoggined ? logginedSettings : notLogginSetting;
  const [openLogoutForm, setOpenLogoutForm] = React.useState(false);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLogOut = () => {
    setOpenLogoutForm(true);
  };
  const handleLogOut = () => {
    authCtx.logout();
    router.push("/login-page");
  };
  const handleClose = () => {
    setOpenLogoutForm(false);
  };
  const handleContinue = () => {
    setOpenLogoutForm(false);
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
        <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
          <Link
            href={setting.link}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography textAlign='center'>{setting.title}</Typography>
          </Link>
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
          <MenuItem onClick={handleOpenLogOut}>
            <Typography textAlign='center'>Log out</Typography>
          </MenuItem>
        )}
      </Menu>
      <div>
        <Dialog
          open={openLogoutForm}
          onClose={handleClose}
          aria-labelledby='alert-log-out'
          aria-describedby='alert-log-out-form'
        >
          <DialogTitle id='alert-dialog-title'>
            Do you want to log out ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleLogOut} autoFocus>
              Yes, I am
            </Button>
            <Button onClick={handleContinue}>No, I don't</Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default HeaderAvatar;
