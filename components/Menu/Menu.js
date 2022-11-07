import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Stack, styled } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AppsIcon from "@mui/icons-material/Apps";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";

const MyBtn = styled(Button)({
  height: "40px",
  width: "40px",
  padding: "0",
});

const menuItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Shopping",
    link: "/shopping",
  },
  {
    title: "Saved Recipe",
    link: "/saved-recipe",
  },
  {
    title: "Profile",
    link: "/personal-profile",
  },
];

const CustomMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpenMenu(true);
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const menuItemList = menuItems.map((item) => {
    return (
      <MenuItem
        key={item.title}
        sx={{ minWidth: "90px" }}
        onClick={() => {
          handleCloseMenu();
          router.push(item.link);
        }}
      >
        {item.title}
      </MenuItem>
    );
  });

  return (
    <>
      <Box
        component={MyBtn}
        onClick={handleOpenMenu}
        sx={{
          padding: "0",
          width: "40px",
          height: "40px",
          minWidth: "41px",
          color: "#333",
          "&:hover": {
            color: "white",
            backgroundColor: "#6ba4e9",
            boxShadow:
              "0 14px 26px -12px rgb(85 150 230 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(85 150 230 / 20%)",
          },
        }}
      >
        <AppsIcon />
      </Box>
      <Stack
        component={Menu}
        open={openMenu}
        direction='row'
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
        sx={{
          "& .MuiMenu-list": {
            width: "300px",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          },
        }}
      >
        {menuItemList}
      </Stack>
    </>
  );
};

export default CustomMenu;
