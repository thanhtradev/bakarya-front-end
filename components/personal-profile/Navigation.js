import { Tabs, Tab, Box, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import PersonalPosts from "./PersonsalPosts";
import Profile from "./Profile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileNav = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack width='100%'>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        orientation='horizontal'
        centered
        sx={{
          top: "70px",
          marginBottom: "20px",
        }}
      >
        <Tab
          label='Posts'
          {...a11yProps(0)}
          sx={{
            borderRadius: "10px",
            color: "#5596e6cf",
            minWidth: "0.3",
            alignSelf: "center",
            marginBottom: "8px",
          }}
        />
        <Tab
          label='Personal Profile'
          {...a11yProps(1)}
          sx={{
            borderRadius: "10px",
            color: "#5596e6cf",
            width: "0.3",
            alignSelf: "center",
            marginBottom: "8px",
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PersonalPosts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Profile />
      </TabPanel>
    </Stack>
  );
};

export default ProfileNav;
