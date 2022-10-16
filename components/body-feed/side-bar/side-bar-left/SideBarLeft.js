import { Box, Chip, Avatar } from "@mui/material";
import SideBar from "../SideBar";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ItemContainer from "../ItemContainer";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBarLeft = () => {
  const [value, setValue] = React.useState(0);

  const navTabs = [
    { title: "Home", icon: <HomeIcon /> },
    { title: "Shopping", icon: <ShoppingCartIcon /> },
    { title: "Livestream", icon: <OndemandVideoIcon /> },
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
          "&.MuiTab-root": {
            justifyContent: "flex-start",
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
    <SideBar left={30} position='sticky' top='0'>
      <Tabs
        component={ItemContainer}
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
        sx={{
          width: "0.8",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <Chip
          avatar={<Avatar>TT</Avatar>}
          label='Thanh Tu'
          sx={{
            height: "40px",
            "&.MuiChip-avatar": {
              width: "30px",
              height: "30px",
            },
          }}
        />
        {tabItems}
      </Tabs>
    </SideBar>
  );
};

export default SideBarLeft;
