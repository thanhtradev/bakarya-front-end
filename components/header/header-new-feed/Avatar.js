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
import { useEffect, useState } from "react";
import axios from "axios";

const logginedSettings = [{ title: "Profile", link: "/personal-profile" }];
const notLogginSetting = [
  { title: "Sign in", link: "/login-page" },
  { title: "Sign up", link: "/signup-page" },
];

const HeaderAvatar = () => {
  const linkRef = React.useRef();
  const router = useRouter();
  const authCtx = React.useContext(AuthContext);
  const isLoggined = authCtx.isLoggedIn;
  const [openLogoutForm, setOpenLogoutForm] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [avatarSrc, SetAvatarSrc] = useState();

  const settings = isLoggined ? logginedSettings : notLogginSetting;

  useEffect(() => {
    GetAvatar();
  }, []);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    console.log(linkRef);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const GetAvatar = async () => {
    try {
      var config = {
        method: "get",
        url: "http://api.bakarya.com/api/user/avatar",
        headers: {
          "x-access-token": authCtx.token,
        },
      };

      const res = await axios(config);
      const src = arrayBufferToBase64(res.data.data.data);
      SetAvatarSrc((prev) => `data:image/png;base64,${src}`);
    } catch (err) {
      console.log(err);
    }

    // axios(config)
    //   .then(function (response) {})
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  //* function change array of buffer to string
  //* for more information
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

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
        <MenuItem
          // onClick={handleCloseUserMenu}
          key={setting.title}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            href={setting.link}
          >
            <Typography
              component='a'
              textAlign='center'
              sx={{ width: "1", height: "1" }}
            >
              {setting.title}
            </Typography>
          </Link>
        </MenuItem>
      ));
    } else {
      return settings.map((setting) => (
        <Link
          href={setting.link}
          key={setting.title}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting.title}</Typography>
          </MenuItem>
        </Link>
      ));
    }
  };

  return (
    <React.Fragment>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Remy Sharp'
            src={avatarSrc}
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
      <React.Fragment>
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
            <Button onClick={handleContinue}>No, I don&apos;t</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
};

export default HeaderAvatar;
