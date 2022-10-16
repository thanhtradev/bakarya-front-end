import React, { useEffect, useState } from "react";
import { alpha, Avatar, Button, CardHeader } from "@mui/material";
import { Typography, Stack } from "@mui/material";
import { useRef } from "react";
import PostSetting from "./PostSetting";

const User = (props) => {
  const [isFollow, setIsFollow] = useState(false);
  const followRef = useRef();

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

  return (
    <CardHeader
      avatar={
        <Avatar alt="Someone's Avatar" sx={{ width: 40, height: 40 }}>
          TT
        </Avatar>
      }
      title={
        <React.Fragment>
          <Typography textTransform='capitalize'>{props.author}</Typography>
          <Button
            ref={followRef}
            disableElevation
            variant='text'
            sx={{
              ":hover": { backgroundColor: alpha("#FDEEDC", 0.7) },
              width: 70,
              height: 30,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={handleFollowButton}
          >
            Follow
          </Button>
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
          <PostSetting />
        </React.Fragment>
      }
      sx={{ width: "100%", padding: 0 }}
    />
  );
};

export default User;
