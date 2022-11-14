import { Box, IconButton, Stack, Typography } from "@mui/material";
import NotLikeIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SavedIcon from "@mui/icons-material/Star";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import { LoadingButton } from "@mui/lab";
// import LikedIcon from "../../assets/like.svg";

import axios from "axios";

const infoIconColor = "#84b6e9";
function Interaction(props) {
  const authCtx = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [numberOfLike, setNumberOfLike] = useState(props.numberOfLike ?? 0);
  const [numberOfComment, setNumberOfComment] = useState(
    props.numberOfComment ?? 0
  );
  const [showComment, setShowComment] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const [isLoadingLikeBtn, setIsLoad]
  useEffect(() => {
    setIsLoggedIn(authCtx.isLoggedIn);
    if (isLoggedIn) {
      checkUserHasLikedPost();
    }
  }, []);

  const infoIcons = [
    {
      icon: <NotLikeIcon fontSize='small' sx={{ fontSize: "17px" }} />,
      // icon: <SvgIcon component={LikedIcon} />,
      quantity: numberOfLike,
    },
    {
      icon: (
        <ChatBubbleOutlineIcon fontSize='small' sx={{ fontSize: "15px" }} />
      ),
      quantity: props.numberOfComment ?? 0,
    },
    {
      icon: <StarOutlineIcon fontSize='small' sx={{ fontSize: "19px" }} />,
      quantity: 10,
    },
  ];

  useEffect(() => {
    if (showComment) {
      props.getComments();
      props.onShowComments();
    } else {
      props.onCloseComments();
    }
  }, [showComment]);

  const handleGetComments = () => {
    setShowComment((prev) => !prev);
  };

  const likeBtnHandler = async () => {
    try {
      setIsLoading(true);

      let url;
      let data;

      //* set url
      if (!isLiked) {
        url = "http://api.bakarya.com/api/mlem";
        data = {
          userid: authCtx.userID,
          recipeid: props.postId,
        };
      } else {
        url = "http://api.bakarya.com/api/unmlem";
        data = {
          recipeid: props.postId,
        };
      }

      //* set config
      var config = {
        method: "post",
        url,
        headers: { "x-access-token": authCtx.token },
        data: data,
      };

      //* fetch
      const res = await axios(config);

      //* action after fetch
      if (isLiked) {
        setIsLiked(false);
        setNumberOfLike((prev) => prev - 1);
      } else {
        setIsLiked(true);
        setNumberOfLike((prev) => prev + 1);
      }
      console.log(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const saveButtonHandler = () => {
    setIsSaved((prev) => {
      if (prev === false) {
        saveBtnAction(props.postId, "http://api.bakarya.com/api/recipe/save");
      } else {
        saveBtnAction(
          props.postID,
          "http://api.bakarya.com/api/recipe/unsaved"
        );
      }
      return !prev;
    });
  };

  const saveBtnAction = async (id, url) => {
    try {
      setIsSaving(true);
      var data = { recipeid: props.postId };

      var config = {
        method: "post",
        url: url,
        headers: {
          "x-access-token": authCtx.token,
        },
        data: data,
      };

      const res = await axios(config);
      console.log(res.data);
      setIsSaving(false);
    } catch (err) {
      alert(err);
    }
  };

  const checkUserHasLikedPost = () => {
    setIsLoading(true);
    var data = { recipeid: props.postId };
    var config = {
      method: "post",
      url: "http://api.bakarya.com/api/mlem/check",
      headers: {
        "x-access-token": authCtx.token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const { mlemmed } = response.data;
        setIsLiked((prev) => {
          setIsLoading(false);
          return mlemmed;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
      {isLoggedIn && (
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
          {isLoading ? (
            <LoadingButton
              loading
              sx={{
                "&.MuiLoadingButton-root": {
                  minWidth: "35px",
                  minHeight: "35px",
                  borderRadius: "50%",
                  bgcolor: infoIconColor,
                },
              }}
            />
          ) : (
            <IconButton
              onClick={likeBtnHandler}
              sx={{
                backgroundColor: infoIconColor,
                backgroundColor: `${isLiked ? infoIconColor : "#84b6e9"}`,
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
          )}
          <IconButton
            onClick={handleGetComments}
            sx={{
              backgroundColor: infoIconColor,
              backgroundColor: "#84b6e9",
              "&:hover": {
                backgroundColor: "#8cadcf",
              },
              width: "35px",
              height: "35px",
              boxShadow: "2px 1px 43px 0px rgb(85 131 106 / 35%)",
            }}
          >
            <ChatBubbleOutlineIcon fontSize='small' sx={{ fontSize: "20px" }} />
          </IconButton>
          {isSaving ? (
            <LoadingButton
              loading
              sx={{
                "&.MuiLoadingButton-root": {
                  minWidth: "35px",
                  minHeight: "35px",
                  borderRadius: "50%",
                  bgcolor: infoIconColor,
                },
              }}
            />
          ) : (
            <IconButton
              onClick={saveButtonHandler}
              sx={{
                backgroundColor: infoIconColor,
                backgroundColor: `${isSaved ? infoIconColor : "#84b6e9"}`,
                width: "35px",
                height: "35px",
                "&:hover": {
                  backgroundColor: "#8cadcf",
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
                  sx={{
                    fontSize: "20px",
                    pointerEvents: "none",
                    color: "#e1c693",
                  }}
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
          )}
        </Stack>
      )}
    </Box>
  );
}

export default Interaction;
