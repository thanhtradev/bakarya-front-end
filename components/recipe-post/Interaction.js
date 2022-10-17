import { Box, IconButton, Stack, Typography } from "@mui/material";
import NotLikeIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SavedIcon from "@mui/icons-material/Star";
import React, { useState } from "react";

const infoIconColor = "#7db9be";

export default function Interaction(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const infoIcons = [
    {
      icon: <NotLikeIcon fontSize='small' sx={{ fontSize: "17px" }} />,
      quantity: props.numberOfLike,
    },
    {
      icon: (
        <ChatBubbleOutlineIcon fontSize='small' sx={{ fontSize: "15px" }} />
      ),
      quantity: props.numberOfComment,
    },
    {
      icon: <StarOutlineIcon fontSize='small' sx={{ fontSize: "19px" }} />,
      quantity: 10,
    },
  ];

  const likeHandler = () => {
    setIsLiked((prev) => !prev);
  };

  const saveHandler = () => {
    setIsSaved((prev) => !prev);
  };

  const infoIconList = infoIcons.map((item, i) => {
    return (
      <Stack
        key={i}
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'
        sx={{
          // backgroundColor: infoIconColor,
          width: "40px",
          height: "30px",
        }}
      >
        {item.icon}
        <Typography>{item.quantity}</Typography>
      </Stack>
    );
  });

  return (
    <Box position='relative' sx={{ width: "1" }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          width: "0.23",
          height: "1",
          // bgcolor: "aquamarine"
        }}
      >
        {infoIconList}
      </Stack>
      <Stack
        position='absolute'
        justifyContent='space-between'
        alignItems='center'
        direction='row'
        sx={{
          width: "120px",
          height: "40px",
          top: -38,
          left: 0,
          // backgroundColor: "blanchedalmond",
        }}
      >
        <IconButton
          onClick={likeHandler}
          sx={{
            backgroundColor: infoIconColor,
            backgroundColor: `${isLiked ? infoIconColor : "#8dd0b3"}`,
            color: `${isLiked ? "#FEFFF6" : ""}`,
            "&:hover": {
              backgroundColor: infoIconColor,
            },
            width: "35px",
            height: "35px",
            boxShadow: "2px 1px 43px 0px rgb(85 131 106 / 35%)",
          }}
        >
          {isLiked ? (
            <FavoriteIcon
              fontSize='small'
              sx={{ fontSize: "20px", pointerEvents: "none" }}
            />
          ) : (
            <NotLikeIcon
              fontSize='small'
              sx={{ fontSize: "20px", pointerEvents: "none" }}
            />
          )}
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: infoIconColor,
            backgroundColor: "#8dd0b3",
            "&:hover": {
              backgroundColor: "#8dd0b3",
            },
            width: "35px",
            height: "35px",
            boxShadow: "2px 1px 43px 0px rgb(85 131 106 / 35%)",
          }}
        >
          <ChatBubbleOutlineIcon fontSize='small' sx={{ fontSize: "20px" }} />
        </IconButton>
        <IconButton
          onClick={saveHandler}
          sx={{
            backgroundColor: infoIconColor,
            backgroundColor: `${isSaved ? infoIconColor : "#8dd0b3"}`,
            width: "35px",
            height: "35px",
            "&:hover": {
              backgroundColor: "#8dd0b3",
            },
            boxShadow: "2px 1px 43px 0px rgb(85 131 106 / 35%)",
          }}
        >
          {isSaved ? (
            <SavedIcon
              viewBox='2 8 21 10'
              height='13px'
              width='13px'
              fontSize='small'
              sx={{ fontSize: "20px", pointerEvents: "none", color: "#e1c693" }}
            />
          ) : (
            <StarOutlineIcon
              viewBox='2 8 20 10'
              height='13px'
              width='13px'
              fontSize='small'
              sx={{ fontSize: "20px", pointerEvents: "none" }}
            />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
}
