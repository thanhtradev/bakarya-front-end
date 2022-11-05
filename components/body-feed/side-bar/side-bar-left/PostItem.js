import {
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Stack,
  ListItemButton,
} from "@mui/material";
import NotLikeIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const PostItem = (props) => {
  const [numberOfComment, setNumberOfComments] = useState(0);
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/posts/${props.postID}`);
  };

  useEffect(() => {
    getNumberOfComments();
  }, [numberOfComment]);

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
  const getNumberOfComments = async () => {
    const comments = await axios.get(
      `http://api.bakarya.com/api/comments/${props.postID}`
    );

    setNumberOfComments(comments.data.length);
  };

  const rawDate = new Date(props.createAt);
  const month = monthNames[rawDate.getMonth()];
  const date = rawDate.getDate().toString();
  const year = rawDate.getFullYear().toString();
  const time = date.concat(" ", month).concat(", ", year);

  return (
    <React.Fragment>
      <ListItemButton
        onClick={handlePostClick}
        alignItems='flex-start'
        sx={{ borderRadius: "10px" }}
      >
        <ListItemAvatar>
          <Avatar
            alt={props.author}
            src='https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg'
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack component='span'>
              <Typography sx={{ textTransform: "capitalize" }}>
                {`${props.name} - ${props.author}`}
              </Typography>
              <Typography variant='caption'>{time}</Typography>
            </Stack>
          }
          secondary={
            <Stack direction='row' spacing={2} component='span'>
              <Typography component='span' variant='body2' color='text.primary'>
                <NotLikeIcon
                  sx={{ fontSize: "17px", marginRight: "8px", color: "red" }}
                />
                {props.numberOfLike}
              </Typography>
              <React.Suspense fallback={`loading`}>
                <Typography
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  <ChatBubbleOutlineIcon
                    sx={{
                      fontSize: "17px",
                      marginRight: "8px",
                      color: "brown",
                    }}
                  />
                  {numberOfComment}
                </Typography>
              </React.Suspense>
            </Stack>
          }
        />
      </ListItemButton>
      <Divider variant='fullWidth' component='li' />
    </React.Fragment>
  );
};

export default PostItem;
