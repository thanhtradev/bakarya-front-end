import { Box, Chip, Avatar, Button } from "@mui/material";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import ItemContainer from "../ItemContainer";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const navTabs = [
    { title: "Home", icon: <HomeIcon /> },
    { title: "Shopping", icon: <ShoppingCartIcon /> },
    { title: "Livestream", icon: <OndemandVideoIcon /> },
    { title: "Saved Recipes", icon: <StarOutlineIcon /> },
    { title: "Log out", icon: <LogoutIcon /> },
  ];

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
  return (
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
      </Tabs>
    </ItemContainer>
  );
};

export default Navigation;
