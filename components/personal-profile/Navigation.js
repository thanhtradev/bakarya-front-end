import { Tabs, Tab, Box, Typography } from "@mui/material";
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
      {value === index && <Box>{children}</Box>}
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
    <React.Fragment>
      <Grid item xs={4} marginTop='10px'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          orientation='vertical'
          centered
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            position: "sticky",
            top: "70px",
          }}
        >
          <Tab
            label='Posts'
            {...a11yProps(0)}
            sx={{
              borderRadius: "10px",
              bgcolor: "#5596e6cf",
              color: "white",
              "&.Mui-selected": {
                color: "black",
                bgcolor: "#5596e6",
              },
              width: "0.6",
              alignSelf: "center",
              marginBottom: "8px",
            }}
          />
          <Tab
            label='Personal Profile'
            {...a11yProps(1)}
            sx={{
              borderRadius: "10px",
              bgcolor: "#5596e6cf",
              color: "white",
              "&.Mui-selected": {
                color: "black",
                bgcolor: "#5596e6",
              },
              width: "0.6",
              alignSelf: "center",
              marginBottom: "8px",
            }}
          />
        </Tabs>
      </Grid>
      <Grid item xs={8} sx={{ padding: 0 }}>
        <TabPanel value={value} index={0}>
          <PersonalPosts />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Profile />
        </TabPanel>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileNav;
