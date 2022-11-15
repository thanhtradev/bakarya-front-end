import { Avatar, Button } from "@mui/material";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import ItemContainer from "../ItemContainer";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AuthContext from "../../../../store/auth-context";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from "../../../ui/RGBLed.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const activeTabLink = ["/", "/shopping", "/saved-recipe"];

const Navigation = ({ username }) => {
  const authCtx = React.useContext(AuthContext);
  const [cookies, setCookies] = useCookies();
  const [value, setValue] = React.useState(0);
  const [openLogoutForm, setOpenLogoutForm] = React.useState(false);
  const [logined, setLogined] = useState(false);
  const [avatarSrc, SetAvatarSrc] = useState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    activeTabLink.indexOf(router.pathname.toString())
  );

  React.useEffect(() => {
    setLogined(authCtx.isLoggedIn);
    GetAvatar();
    setIsLoading(false);
  }, []);

  const navTabs = [
    {
      title: "Home",
      icon: <HomeIcon />,
      onNavItemClick: () => {
        // setActiveTab(activeTabLink.indexOf(router.pathname));
        router.push("/");
      },
    },
    {
      title: "Shopping",
      icon: <ShoppingCartIcon />,
      onNavItemClick: () => {
        router.push("/shopping");
      },
    },
    {
      title: "Saved Recipes",
      icon: <StarOutlineIcon />,
      link: "saved-recipes",
      onNavItemClick: () => {
        // setActiveTab(activeTabLink.indexOf(router.pathname));
        router.push("/saved-recipe");
      },
    },
  ];

  const GetAvatar = () => {
    var config = {
      method: "get",
      url: "http://api.bakarya.com/api/user/avatar",
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    axios(config)
      .then(function (response) {
        const src = arrayBufferToBase64(response.data.data.data);
        SetAvatarSrc((prev) => `data:image/png;base64,${src}`);
      })
      .catch(function (error) {});
  };

  //* function change array of buffer to string
  //* for more information
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const handleLogOut = () => {
    authCtx.logout();
    router.push("/login-page");
  };

  const tabItems = navTabs.map((item, i) => {
    return (
      <Tab
        key={i}
        label={item.title}
        {...a11yProps(i)}
        icon={item.icon}
        onClick={item.onNavItemClick}
        iconPosition='start'
        sx={{
          borderRadius: "14px",
          "&.MuiTab-root": {
            justifyContent: "flex-start",
            minHeight: "3rem",
          },
          "&.Mui-selected": {
            backgroundColor: "#bbbbbb7d",
            fontWeight: "bold",
            color: "unset",
          },
          "&.Mui-focusVisible": {
            display: "none",
          },
        }}
      />
    );
  });

  const handleChange = (event, newValue) => {
    setActiveTab(activeTabLink.indexOf(router.pathname.toString()));
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleClick = () => {
    router.push("/personal-profile");
  };

  const handleOpenLogOut = () => {
    setOpenLogoutForm(true);
  };

  const handleClose = () => {
    setOpenLogoutForm(false);
  };
  const handleContinue = () => {
    setOpenLogoutForm(false);
  };

  return (
    <React.Fragment>
      <ItemContainer>
        {authCtx.isLoggedIn && !isLoading && (
          <Button
            variant='outlined'
            onClick={handleClick}
            className={`${classes["to-RGB-Text"]} ${classes["to-RGB-Border"]}`}
            startIcon={
              <Avatar
                alt='Thanh Tu'
                src={avatarSrc}
                sx={{ width: "38px", height: "38px" }}
              >
                TT
              </Avatar>
            }
            sx={{
              height: "40px",
              color: "unset",
              textTransform: "none",
              fontSize: "13px",
              paddingLeft: "10px",
              height: "50px",
              justifyContent: "flex-start",
              bgcolor: "unset",
              borderRadius: "15px",
              marginBottom: "10px",
              "&.MuiButton-root": {
                width: "0.9",
              },
            }}
          >
            <Typography variant='body1' fontWeight='bold'>
              {!isLoading ? username : "Loading..."}
            </Typography>
          </Button>
        )}
        <Tabs
          orientation='vertical'
          // value={activeTab}
          value={
            activeTabLink.indexOf(router.pathname) === -1
              ? 0
              : activeTabLink.indexOf(router.pathname)
          }
          onChange={handleChange}
          aria-label='Navigation Bar'
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            width: "1",
            border: "none",
          }}
        >
          {tabItems}
          {logined && (
            <Tab
              label='Sign out'
              {...a11yProps(5)}
              icon={<LogoutIcon />}
              onClick={handleOpenLogOut}
              iconPosition='start'
              sx={{
                borderRadius: "14px",
                "&.MuiTab-root": {
                  justifyContent: "flex-start",
                  minHeight: "3rem",
                },
                "&.Mui-selected": {
                  backgroundColor: "#bbbbbb7d",
                  fontWeight: "bold",
                  color: "unset",
                },
                "&.Mui-focusVisible": {
                  display: "none",
                },
              }}
            />
          )}
        </Tabs>
      </ItemContainer>
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
            <Button onClick={handleContinue}>No, I don&apos;t</Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
