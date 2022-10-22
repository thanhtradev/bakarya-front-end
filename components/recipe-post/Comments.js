import {
  Stack,
  Box,
  InputAdornment,
  IconButton,
  FilledInput,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import LoadingButton from "@mui/lab/LoadingButton";

const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Comments = (props) => {
  const authCtx = useContext(AuthContext);
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const [isLoadingNewComment, setIsLoadingComment] = useState(false);

  useEffect(() => {
    setComments(props.comments);
  }, []);

  const handleSetNewComment = async (comment) => {
    try {
      setIsLoadingComment(true);
      const allComments = await axios.get(
        `http://api.bakarya.com/api/comments/${props.recipeId}`
      );
      setComments((prev) => [...allComments.data].reverse());
      props.onGetComments();
      setIsLoadingComment(false);
    } catch (err) {
      alert(err);
    }
  };

  const commentList = comments.map((comment) => {
    const rawDate = new Date(comment.createdAt);
    const month = monthNames[rawDate.getMonth()];
    const date = rawDate.getDate().toString();
    const year = rawDate.getFullYear().toString();
    const time = date.concat(" ", month).concat(", ", year);

    return (
      <Stack
        justifyContent='flex-start'
        alignItems='center'
        direction='row'
        spacing={0.8}
        paddingX='10px'
        width='0.7'
        key={comment._id}
      >
        <Avatar variant='circular' sx={{ width: "35px", height: "35px" }} />
        <Stack alignItems='flex-end'>
          <Paper
            elevation={1}
            component={Stack}
            direction='row'
            alignItems='flex-start'
            spacing={2}
            justifyContent={"center"}
            paddingX='10px'
            sx={{ width: "1", bgcolor: "#e6e6e6" }}
          >
            <Stack
              justifyContent='space-evenly'
              alignItems='flex-start'
              sx={{ width: "fit-content" }}
            >
              <Typography variant='body1' fontWeight='bold' fontSize='13px'>
                {comment.user_id.username}
              </Typography>
              <Typography variant='body1' fontSize='15px'>
                {comment.comment}
              </Typography>
            </Stack>
          </Paper>
          <Typography variant='caption' fontSize='10px'>
            {time}
          </Typography>
        </Stack>
      </Stack>
    );
  });

  const handleComment = () => {
    if (commentRef.current.value.trim() !== "") {
      const data = {
        recipeid: props.recipeId,
        userid: authCtx.userID,
        comment: commentRef.current.value,
        user_id: { username: authCtx.username },
        createdAt: new Date(),
      };
      var config = {
        method: "post",
        url: "http://api.bakarya.com/api/comment",
        headers: {
          "x-access-token": authCtx.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          handleSetNewComment(data);
          commentRef.current.value = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <React.Fragment>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={1}
        sx={{
          width: "1",
          height: "fit-content",
          padding: "5px",
        }}
      >
        <Avatar sx={{ width: "35px", height: "35px" }} />
        <FilledInput
          inputRef={commentRef}
          placeholder='Share your thoughts with us'
          multiline
          inputProps={{
            "&.MuiFilledInput-root": {
              paddingY: 0,
              bgcolor: "red",
            },
          }}
          endAdornment={
            isLoadingNewComment ? (
              <LoadingButton
                loading
                variant='contained'
                sx={{
                  minWidth: "24px",
                  minHeight: "24px",
                  borderRadius: "50%",
                  padding: 0,
                }}
              />
            ) : (
              <InputAdornment>
                <IconButton onClick={handleComment}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          sx={{
            width: "0.8",
            height: "1",
            "& .MuiFilledInput-input": {
              paddingY: 0,
            },
          }}
        />
      </Stack>

      {commentList}
    </React.Fragment>
  );
};

export default React.memo(Comments);
