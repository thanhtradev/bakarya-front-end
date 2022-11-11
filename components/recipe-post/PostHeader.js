import * as React from "react";
import { alpha, Avatar, Button, CardHeader } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { useRef, useContext, useState, useEffect } from "react";
import PostSetting from "./PostSetting";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const User = (props) => {
  const [isFollow, setIsFollow] = useState(false);
  const followRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoadingFollow, setIsloadingFollow] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");

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

  const rawDate = new Date(props.createAt);
  const month = monthNames[rawDate.getMonth()];
  const date = rawDate.getDate().toString();
  const year = rawDate.getFullYear().toString();
  const time = date.concat(" ", month).concat(", ", year);

  useEffect(() => {
    if (isFollow) {
      followRef.current.textContent = "Following";
    } else {
      followRef.current.textContent = "Follow";
    }
  }, [isFollow]);

  const handleFollowButton = () => {
    if (isFollow) {
      setIsFollow(false);
    } else {
      setIsFollow(true);
    }
  };

  const handleUserFollowBtn = async () => {
    setIsloadingFollow(true);

    let actionURL;
    let data;

    if (!isFollow) {
      actionURL = "http://api.bakarya.com/api/user/follow";
      data = {
        followuserid: props.authorID,
      };
    } else {
      actionURL = "http://api.bakarya.com/api/user/unfollow";
      data = {
        unfollowuserid: props.authorID,
      };
    }

    const res = await axios({
      method: "POST",
      url: actionURL,
      headers: {
        "x-access-token": authCtx.token,
      },
      data: data,
    });

    if (isFollow) {
      setIsFollow(false);
    } else {
      setIsFollow(true);
    }
    setIsloadingFollow(false);
  };

  const handleGetUserAvatar = () => {};

  return (
    <CardHeader
      avatar={
        <Avatar alt="Someone's Avatar" sx={{ width: 40, height: 40 }}>
          TT
        </Avatar>
      }
      title={
        <React.Fragment>
          <Typography sx={{ fontWeight: "bold" }}>{props.author}</Typography>
          {isLoadingFollow ? (
            <LoadingButton loading variant='outlined'>
              Loading
            </LoadingButton>
          ) : (
            <Button
              ref={followRef}
              disableElevation
              onClick={handleUserFollowBtn}
              variant='text'
              sx={{
                ":hover": { backgroundColor: alpha("#FDEEDC", 0.7) },
                width: 70,
                height: 30,
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              Follow
            </Button>
          )}
        </React.Fragment>
      }
      titleTypographyProps={{
        display: "flex",
        width: "fit-content",
        alignItems: "center",
      }}
      subheader={time}
      action={
        <React.Fragment>
          <PostSetting postID={props.postID} />
        </React.Fragment>
      }
      sx={{ width: "100%", padding: 0 }}
    />
  );
};

export default User;
