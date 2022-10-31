import React from "react";
import "../styles/globals.css";
import { AuthContextProvider } from "../store/auth-context";
import HeaderNewFeed from "../components/header/header-new-feed/header";
import { Box, Stack } from "@mui/material";
const ProgressBar = dynamic(() => import("../components/ui/ProgressBar"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { Container, Row, Col } from "react-bootstrap";
import SideBarRight from "../components/body-feed/side-bar/side-bar-right/SideBarRight";
import SideBarLeft from "../components/body-feed/side-bar/side-bar-left/SideBarLeft";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <AuthContextProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </AuthContextProvider>
    );
  }
  return (
    <AuthContextProvider>
      <Box
        sx={{
          width: "1",
          height: "57px",
        }}
      >
        <HeaderNewFeed />
        <ProgressBar />
      </Box>
      <Container fluid>
        <Row
          style={{
            paddingTop: "20px",
            backgroundColor: "#f4f4f4",
            padding: "20px 0 0 0",
          }}
        >
          {/* //? SideBar Left */}
          <Col>
            <SideBarLeft />
          </Col>
          <Col xl={6} fluid='true'>
            <Container
              fluid='lg'
              style={{
                padding: "0 20px",
              }}
            >
              <Stack justify-content='center' alignItems='center' spacing={2}>
                <Component {...pageProps} />
              </Stack>
            </Container>
          </Col>
          {/* //? SideBar Right */}
          <Col>
            <SideBarRight />
          </Col>
        </Row>
      </Container>
    </AuthContextProvider>
  );
}

export default MyApp;
