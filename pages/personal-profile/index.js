import React, { useState } from "react";
import Head from "next/head";
import { Avatar, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileNav from "../../components/personal-profile/Navigation";
import UploadIcon from "@mui/icons-material/Upload";

export default function PersonalPage() {
  const [openModal, setModal] = useState(false);

  const toggleOpenModal = () => {
    setModal((prev) => !prev);
  };

  const handleUploadWallPaper = () => {};

  return (
    <React.Fragment>
      <Head>
        <title>Personal Profile Page</title>
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
            <Stack
              position='absolute'
              justifyContent='center'
              alignItems='center'
              onClick={handleUploadWallPaper}
              zIndex={100}
              right={0}
              left={0}
              top={0}
              bottom={0}
              sx={{ bgcolor: "#42403f70" }}
            >
              <Button
                onClick={handleUploadWallPaper}
                startIcon={<UploadIcon sx={{ fontSize: "17px" }} />}
                sx={{ color: "white" }}
              >
                Upload a photo
              </Button>
            </Stack>
          )}
        </Container>
        <Grid
          container
          direction='row'
          justifyContent='space-evenly'
          sx={{
            width: "1",
            height: "200px",
            height: "200px",
            // // bgcolor: "burlywood",
            paddingTop: "20px",
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
              // bgcolor: "cadetblue",
              direction: "column",
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
                />
              </Stack>
              <Button>Upload a photo</Button>
            </Stack>
          </Grid>
          <Grid
            item
            xs={4}
            sx={
              {
                // bgcolor: "chocolate",
              }
            }
          >
            <Stack spacing={1}>
              <Typography variant='h5' fontWeight='bold'>
                Thanh Tu
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
          <Grid item xs={4}>
            <Button
              sx={{
                height: "50px",
                // bgcolor: "cornflowerblue"
              }}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <ProfileNav />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
