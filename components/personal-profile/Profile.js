import { Box, Paper, Stack, Typography } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import CenteredLoadingCircular from "../ui/CenteredLoadingCircular";
import { useRouter } from "next/router";
const iconSize = "30px";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthday, setBirthday] = useState();
  const [email, setEmail] = useState("");
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userid } = router.query;

  useEffect(() => {
    fetchUserProfile();
  }, [firstName, lastname, birthday, email]);

  const tabInfo = [
    {
      title: "Full name",
      content: `${lastname} ${firstName}`,
      icon: (
        <PermIdentityIcon sx={{ fontSize: iconSize, color: "deepskyblue" }} />
      ),
    },
    {
      title: "Birthday",
      content: birthday,
      icon: (
        <CakeOutlinedIcon sx={{ fontSize: iconSize, color: "palevioletred" }} />
      ),
    },
    {
      title: "Email",
      content: email,
      icon: <MailOutlineIcon sx={{ fontSize: iconSize, color: "cadetblue" }} />,
    },
  ];

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "get",
        url: `http://api.bakarya.com/api/userid/profile/${userid}`,
        headers: {
          "x-access-token": authCtx.token,
        },
      });

      const { birthday, email, firstname, lastname } = res.data;
      const dateConverted = setDate(birthday);
      setBirthday(dateConverted);
      setFirstName(firstname);
      setLastName(lastname);
      setEmail(email);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setDate = (string) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const rawDate = new Date(string);
    const month = monthNames[rawDate.getMonth()];
    const day = rawDate.getDate().toString();
    const year = rawDate.getFullYear().toString();
    const time = day.concat(" ", month).concat(", ", year);

    return time;
  };

  const infoSections = tabInfo.map((info) => {
    return (
      <Paper
        component={Stack}
        key={info.title}
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
    <Stack
      width='100%'
      justifyContent='space-evenly'
      alignItems='center'
      spacing={2}
    >
      {isLoading ? <CenteredLoadingCircular /> : infoSections}
    </Stack>
  );
};

export default Profile;
