import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cart from "./Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import logo from "../../../assets/logo.png";
import classes from "./header.module.css";
import {
  Box,
  Button,
  Input,
  Container as MUIContainer,
  Stack,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Avatar from "./Avatar";
import _Menu from "../../Menu/Menu";
import React from "react";

const MyBtn = styled(Button)({
  height: "40px",
  width: "40px",
  padding: "0",
});

const MyInput = styled(Input)({
  minWidth: "200px",
  height: "30px",
  // backgroundColor: "#f7f7f7",
  paddingLeft: "30px",
  borderRadius: "15px",
  fontSize: "14px",
  color: "black",
  borderColor: "#f7f7f7",
});

const iconList = [
  { title: "", item: <FavoriteBorderIcon /> },
  { title: "", item: <NotificationsNoneIcon /> },
  { title: "", item: <_Menu /> },
];

const iconBtns = iconList.map((icon, index) => {
  return (
    // <Box
    //   component={MyBtn}
    //   key={index}
    //   sx={{
    //     padding: "0",
    //     width: "40px",
    //     height: "40px",
    //     minWidth: "41px",
    //     color: "#333",
    //     "&:hover": {
    //       color: "white",
    //       backgroundColor: "#6ba4e9",
    //       boxShadow:
    //         "0 14px 26px -12px rgb(85 150 230 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(85 150 230 / 20%)",
    //     },
    //   }}
    // >

    // </Box>
    <React.Fragment key={index}>{icon.item}</React.Fragment>
  );
});

function HeaderNewsFeed() {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='light'
      variant='dark'
      fixed='top'
      style={{
        margin: 0,
        // borderBottom: "1px solid rgba(5,5,5,0.4)",
        boxShadow: "rgb(126 125 125 / 20%) 1px 1px 10px 3px",
        height: "57px",
      }}
    >
      <Container
        fluid='xl'
        style={{ color: "black", minWidth: "100%", margin: 0 }}
      >
        <Box
          component={Navbar.Brand}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "55px",
            height: "50px",
            minWidth: 40,
          }}
        >
          <Link
            href='/'
            style={{ width: "50px", height: "50px", color: "black" }}
          >
            <Box
              alt='bakarya logo'
              src={`${logo.src}`}
              component='img'
              sx={{ height: "1", width: "50px" }}
            />
          </Link>
        </Box>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav
            className='me-auto'
            style={{
              width: "16%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {iconBtns}
          </Nav>
          <Nav
            justify={true}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "27%",
            }}
          >
            <Stack
              component={MUIContainer}
              position='relative'
              alignItems='center'
              justifyContent='center'
              direction='row'
              className={classes["menu-item"]}
              sx={{
                backgroundColor: "#f7f7f7",
                padding: "3px 40px 3px 10px",
                minWidth: "150px",
                height: "30px",
                borderRadius: "20px",
              }}
            >
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  margin: "0",
                }}
              >
                <SearchIcon sx={{ color: "#333" }} />
              </Box>
              <MyInput placeholder='Find a recipe' disableUnderline={true} />
            </Stack>
            <Cart />
            <Avatar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNewsFeed;
