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

const Navigation = () => {
  const authCtx = React.useContext(AuthContext);
  const [value, setValue] = React.useState(0);
  const [openLogoutForm, setOpenLogoutForm] = React.useState(false);
  const [logined, setLogined] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setLogined(authCtx.isLoggedIn);
  }, []);

  const navTabs = [
    { title: "Home", icon: <HomeIcon /> },
    { title: "Shopping", icon: <ShoppingCartIcon /> },
    { title: "Livestream", icon: <OndemandVideoIcon /> },
    { title: "Saved Recipes", icon: <StarOutlineIcon /> },
  ];

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
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleClick = () => {
    console.log("hi");
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
        <Button
          variant='outlined'
          onClick={handleClick}
          startIcon={
            <Avatar alt='Thanh Tu' sx={{ width: "38px", height: "38px" }}>
              TT
            </Avatar>
          }
          sx={{
            height: "40px",
            color: "unset",
            textTransform: "capitalize",
            fontSize: "19px",
            paddingLeft: "10px",
            height: "50px",
            justifyContent: "flex-start",
            bgcolor: "#c0d2ee",
            borderRadius: "15px",
            marginBottom: "10px",
            "&.MuiButton-root": {
              width: "0.9",
            },
          }}
        >
          <Typography variant='subtitle1' fontWeight='bold'>
            Thanh Tu
          </Typography>
        </Button>
        <Tabs
          orientation='vertical'
          value={value}
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
          }}
        >
          {tabItems}
          {logined && (
            <Tab
              label='log out'
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
            <Button onClick={handleContinue}>No, I don't</Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
