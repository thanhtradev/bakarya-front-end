import * as React from "react";
import {
  Stack,
  Tab,
  Tabs,
  Button,
  Box,
  Avatar,
  Typography,
  styled,
} from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const icons = [
  { icon: <EventOutlinedIcon />, title: "Post a recipe" },
  { icon: <LiveTvOutlinedIcon />, title: "Livestream" },
  { icon: <ModeEditOutlineOutlinedIcon />, title: "Events" },
];

const MyTabs = styled(Tabs)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const tabs = icons.map((icon, i) => {
  if (icon === icons[0]) {
    return (
      <Tab
        key={i}
        label={icon.title}
        icon={icon.icon}
        iconPosition='start'
        sx={{
          borderTopLeftRadius: "18px",
        }}
      />
    );
  }
  return (
    <Tab key={i} label={icon.title} icon={icon.icon} iconPosition='start' />
  );
});

const CreatePost = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#fcfcfc",
        height: "10.5rem",
        width: "1",
        borderRadius: "15px",
        border: "1px solid rgb(79 79 79 / 52%)",
        marginBottom: "20px",
      }}
    >
      <Box
        component={Tabs}
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        centered
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
      >
        {tabs}
      </Box>
      <Stack direction='row' sx={{ height: "80%" }}>
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{ width: "0.1" }}
        >
          <Avatar />
        </Stack>
        <Box component={Button} sx={{ width: "0.9", color: "grey" }}>
          <Typography sx={{ color: "#444" }}>Share your recipes....</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CreatePost;
