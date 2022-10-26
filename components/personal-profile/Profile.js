import { Box, Paper, Stack, Typography } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const iconSize = "30px";
const tabInfo = [
  {
    title: "Full name",
    content: "Bui Thanh TU",
    icon: (
      <PermIdentityIcon sx={{ fontSize: iconSize, color: "deepskyblue" }} />
    ),
  },
  {
    title: "Birthday",
    content: "20/11/2001",
    icon: (
      <CakeOutlinedIcon sx={{ fontSize: iconSize, color: "palevioletred" }} />
    ),
  },
  {
    title: "Email",
    content: "tonyandy456@gmail.com",
    icon: <MailOutlineIcon sx={{ fontSize: iconSize, color: "cadetblue" }} />,
  },
];

const Profile = () => {
  const infoSections = tabInfo.map((info) => {
    return (
      <Paper
        component={Stack}
        direction='row'
        spacing={1.5}
        paddingLeft='8px'
        elevation={0}
        alignItems='center'
        sx={{ width: "300px", border: "1px solid #a5d0fa" }}
      >
        {info.icon}
        <Stack component='span'>
          <Typography variant='subtitle1' fontWeight='bold'>
            {info.title}
          </Typography>
          <Typography>{info.content}</Typography>
        </Stack>
      </Paper>
    );
  });
  return (
    <Stack width='100%' justifyContent='space-evenly' spacing={2}>
      {infoSections}
    </Stack>
  );
};

export default Profile;
