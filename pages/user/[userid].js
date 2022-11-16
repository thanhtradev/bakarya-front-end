import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileNav from "../../components/personal-profile/Navigation";
import UploadIcon from "@mui/icons-material/Upload";
// import UpdateProfile from "../../components/personal-profile/UpdateProfile";
import dynamic from "next/dynamic";
import axios from "axios";
import { Avatar, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";

export default function Userpage() {
  const router = useRouter();
  const { userid } = router.query;
  const [avatarSrc, setAvatarSrc] = useState("");
  const [fullname, setFullname] = useState();
  const [numberOfRecipe, setNumberOfRecipe] = useState(0);
  const authCtx = useContext(AuthContext);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);

  useEffect(() => {
    getAvatar();
    getInfo();
  }, []);

  const getAvatar = async () => {
    const url = `http://api.bakarya.com/api/userid/avatar/${userid}`;
    const res = await axios.get(url);

    const { avatar_url } = res.data;
    setAvatarSrc((prev) => avatar_url);
  };

  const getInfo = () => {
    var config = {
      method: "get",
      url: `http://api.bakarya.com/api/userid/profile/${userid}`,
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const { lastname, firstname, numberOfRecipes, followers, following } =
          response.data;
        setFullname((prev) => lastname.concat(" ").concat(firstname));
        setNumberOfRecipe(numberOfRecipes);
        setNumberOfFollowers(followers.length);
        setNumberOfFollowing(following.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>User Page</title>
      </Head>
      <Container
        maxWidth='lg'
        disableGutters={true}
        sx={{
          marginY: "15px",
        }}
      >
        <Container
          disableGutters
          sx={{
            borderRadius: "10px",
            height: "300px",
            position: "relative",
            bgcolor: "beige",
            backgroundImage:
              "url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        ></Container>
        <Grid
          container
          direction='row'
          justifyContent='space-evenly'
          sx={{
            width: "1",
            height: "170px",
            paddingTop: "20px",
            // bgcolor: "cadetblue",
          }}
        >
          <Grid
            item
            xs={4}
            direction='column'
            justifyContent='space-evenly'
            alignItems='center'
            sx={{
              position: "relative",
              height: "fit-content",
              direction: "column",
              marginBottom: "10px",
            }}
          >
            <Stack
              justifyContent='center'
              alignItems='center'
              sx={{ height: "1" }}
            >
              <Stack
                alignItems='center'
                sx={{
                  position: "absolute",
                  top: "-70px",
                  right: 0,
                  left: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: "113px",
                    height: "113px",
                    border: "3px solid white",
                    zIndex: 100,
                  }}
                  src={avatarSrc}
                />
                <Typography variant='h5' fontWeight='bold'>
                  {fullname}
                </Typography>
                <Stack direction='row' spacing={3} color='#5985d4'>
                  <Typography>{numberOfRecipe} Posts</Typography>
                  <Typography>{numberOfFollowers} Followers</Typography>
                  <Typography>{numberOfFollowing} Following </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Stack spacing={1}>
              <Typography variant='subtitle2' maxWidth='500px'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iam
                enim adesse poterit. Quis est tam dissimile homini. At ille
                pellit, qui permulcet sensum voluptate. Vide, quaeso, rectumne
                sit. Primum quid tu dicis breve?
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <ProfileNav
            userid={userid}
            showCreatePost={"none"}
            displayReport={"initial"}
          />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
