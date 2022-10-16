import { Box, Chip, Avatar } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
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
        disableRipple={true}
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

  return (
    <Tabs
      component={ItemContainer}
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
      }}
    >
      <Chip
        clickable={true}
        component='button'
        avatar={<Avatar alt='Thanh Tu'>TT</Avatar>}
        label={
          <Typography variant='subtitle1' fontWeight='bold' fontSize='19px'>
            Thanh Tu
          </Typography>
        }
        sx={{
          height: "40px",
          "& .MuiChip-avatar": {
            width: "38px",
            height: "38px",
            fontSize: "20px",
          },
          "&.MuiChip-root": {
            paddingLeft: "10px",
            height: "50px",
            justifyContent: "flex-start",
            bgcolor: "#c0d2ee",
          },
          marginBottom: "10px",
        }}
      />
      {tabItems}
    </Tabs>
  );
};

export default Navigation;
