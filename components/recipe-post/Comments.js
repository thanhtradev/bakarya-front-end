import {
  Stack,
  InputAdornment,
  IconButton,
  FilledInput,
  Avatar,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import LoadingButton from "@mui/lab/LoadingButton";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";
import ReplyComments from "./ReplyComments";

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
  const [comments, setComments] = useState(props.comments);
  const [isLoadingNewComment, setIsLoadingComment] = useState(false);

  const handleSetNewComment = async (comment) => {
    try {
      setIsLoadingComment(true);
      const allComments = await axios.get(
        `http://api.bakarya.com/api/comments/${props.recipeId}`
      );
      setComments((prev) => [...allComments.data.reverse()]);
      props.onGetComments();
      setIsLoadingComment(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleChangeComment = () => {
    if (commentRef.current.value.includes("\n")) {
      handleComment();
      handleSetNewComment();
      commentRef.current.value = "";
    }
  };

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
          handleSetNewComment(data);
          commentRef.current.value = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const commentList = props.comments.map((comment) => {
    const rawDate = new Date(comment.createdAt);
    const month = monthNames[rawDate.getMonth()];
    const date = rawDate.getDate().toString();
    const year = rawDate.getFullYear().toString();
    const time = date.concat(" ", month).concat(", ", year);
    return (
      <Stack
        key={comment._id}
        direction='column'
        sx={{
          width: "fit-content",
        }}
      >
        <Comment
          replies={comment.replies.length}
          id={comment._id}
          username={comment.user_id.username}
          comment={comment.comment}
          time={time}
        />
      </Stack>
    );
  });

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
          onChange={handleChangeComment}
          placeholder='Share your thoughts with us'
          multiline
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
              <InputAdornment position='end'>
                <IconButton onClick={handleComment} type='submit'>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          sx={{
            width: "0.8",
            height: "1",
          }}
        />
      </Stack>
      {commentList}
    </React.Fragment>
  );
};

export default Comments;
