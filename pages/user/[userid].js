import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileNav from "../../components/personal-profile/Navigation";
import UploadIcon from "@mui/icons-material/Upload";
// import UpdateProfile from "../../components/personal-profile/UpdateProfile";
import dynamic from "next/dynamic";
import axios from "axios";
import { Container } from "@mui/material";
import Head from "next/head";

export default function Userpage() {
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
            height: "200px",
            height: "fit-content",
            paddingTop: "20px",
          }}
        >
          {/* <AvatarUser /> */}
          <Grid item xs={5}>
            <Stack spacing={1}>
              <Typography variant='h5' fontWeight='bold'>
                {username}
              </Typography>
              <Stack direction='row' spacing={3} color='#5985d4'>
                <Typography>10 post</Typography>
                <Typography>10 followers</Typography>
                <Typography>104 following</Typography>
              </Stack>
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
          <ProfileNav />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
