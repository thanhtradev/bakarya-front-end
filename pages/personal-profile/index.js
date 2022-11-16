import React, { useRef, useState, useContext, useEffect } from "react";
import Head from "next/head";
import {
  Avatar,
  Button,
  Container,
  Stack,
  Typography,
  Fade,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileNav from "../../components/personal-profile/Navigation";
import UploadIcon from "@mui/icons-material/Upload";
// import UpdateProfile from "../../components/personal-profile/UpdateProfile";
import AuthContext from "../../store/auth-context";
import AvatarUser from "../../components/personal-profile/Avatar";
import dynamic from "next/dynamic";
import axios from "axios";
const UpdateProfile = dynamic(
  () => import("../../components/personal-profile/UpdateProfile"),
  {
    suspense: true,
  }
);

export default function PersonalPage() {
  const [openModal, setModal] = useState(false);
  const [username, setUsername] = useState();
  const wallpaperFile = useRef();
  const authCtx = useContext(AuthContext);

  const toggleOpenModal = () => {
    setModal((prev) => !prev);
  };

  const handleUploadWallPaper = () => {
    wallpaperFile.current.click();
    const formData = new FormData();

    // Update the formData object
  };

  useEffect(() => {
    fetchUserProfile();
    getInfo();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const url = "http://api.bakarya.com/api/user/profile";
      var config = {
        method: "get",
        url: url,
        headers: {
          "x-access-token": authCtx.token,
        },
      };

      const res = await axios(config);

      const { firstname, lastname } = res.data;
      const username = lastname.concat(" ").concat(firstname);
      setUsername(username);
    } catch (err) {
      alert(err);
    }
  };
  const getInfo = () => {
    var config = {
      method: "get",
      url: `http://api.bakarya.com/api/userid/profile/${authCtx.userID}`,
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const { lastname, firstname, numberOfRecipes, followers, following } =
          response.data;
        setNumberOfRecipe(numberOfRecipes);
        setNumberOfFollowers(followers.length);
        setNumberOfFollowing(following.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onChangeWallpaper = () => {
    console.log(wallpaperFile.current.files[0]);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Personal Profile Page</title>
      </Head>
      <Container
        maxWidth="lg"
        disableGutters={true}
        sx={{
          marginY: "15px",
        }}
      >
        <Container
          disableGutters
          onMouseOver={toggleOpenModal}
          onMouseOut={toggleOpenModal}
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
              // filter: "brightness(0.5)",
            },
          }}
        >
          {openModal === true && (
            <Fade in={openModal}>
              <Stack
                position="absolute"
                justifyContent="center"
                alignItems="center"
                onClick={handleUploadWallPaper}
                zIndex={100}
                right={0}
                left={0}
                top={0}
                bottom={0}
                sx={{
                  bgcolor: "#42403f70",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <Button
                  type="file"
                  accept="image/*"
                  startIcon={<UploadIcon sx={{ fontSize: "17px" }} />}
                  sx={{ color: "white" }}
                >
                  Upload a photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={wallpaperFile}
                  style={{ display: "none" }}
                  onChange={onChangeWallpaper}
                />
              </Stack>
            </Fade>
          )}
        </Container>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          sx={{
            width: "1",
            height: "200px",
            height: "fit-content",
            paddingTop: "20px",
          }}
        >
          <AvatarUser />
          <Grid item xs={5}>
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight="bold">
                {username}
              </Typography>
              <Stack direction="row" spacing={3} color="#5985d4">
                <Typography>{numberOfRecipe} Posts</Typography>
                <Typography>{numberOfFollowers} Followers</Typography>
                <Typography>{numberOfFollowing} Following </Typography>
              </Stack>
              <Typography variant="subtitle2" maxWidth="500px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iam
                enim adesse poterit. Quis est tam dissimile homini. At ille
                pellit, qui permulcet sensum voluptate. Vide, quaeso, rectumne
                sit. Primum quid tu dicis breve?
              </Typography>
            </Stack>
          </Grid>
          <UpdateProfile />
        </Grid>
        <Grid container spacing={0}>
          <ProfileNav userid={authCtx.userID} />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
