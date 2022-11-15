import * as React from "react";
import { Stack, Tab, Tabs, Box, Avatar } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CreatePostForm from "./CreatePostForm";
import axios from "axios";
import AuthContext from "../../../store/auth-context";

const icons = [
  { icon: <EventOutlinedIcon />, title: "Post a recipe" },
  { icon: <LiveTvOutlinedIcon />, title: "Livestream" },
  { icon: <ModeEditOutlineOutlinedIcon />, title: "Events" },
];
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
    <Tab
      key={i}
      disabled
      label={icon.title}
      icon={icon.icon}
      iconPosition='start'
    />
  );
});

const CreatePost = (props) => {
  const [value, setValue] = React.useState(0);
  const [avatarSrc, SetAvatarSrc] = React.useState();
  const authCtx = React.useContext(AuthContext);

  React.useEffect(() => {
    GetAvatar();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        const { avatar_url } = response.data;
        SetAvatarSrc((prev) => avatar_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //* function change array of buffer to string
  //* for more information
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  return (
    <Stack
      sx={{
        backgroundColor: "#fcfcfc",
        height: "8.5rem",
        width: "40.57rem",
        borderRadius: "15px",
        border: "1px solid #e8e8e8",
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
          sx={{ width: "0.1", paddingLeft: "10px" }}
        >
          <Avatar src={avatarSrc} />
        </Stack>
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{ width: "1", height: "1" }}
        >
          <CreatePostForm handleCreatedPost={props?.handleCreatedPost} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreatePost;
