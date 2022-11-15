import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  Input,
  IconButton,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import ReplyComments from "./ReplyComments";

const Comment = (props) => {
  const replyRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isReply, setIsReply] = useState(false);
  const [numberOfReplies, setNumberOfReplies] = useState(props.replies);
  const [replies, setReplies] = useState([]);
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    setIsReply((prev) => !prev);
  };

  const handleShowReply = () => {
    setShowReply((prev) => !prev);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleReplyComment();
    }
  };

  const handleChangeReply = () => {
    const replyText = replyRef.current.value;
    console.log(replyText);
    if (replyText.includes("\n")) {
      // sendReplyHandler();
      sendReplyHandler();
      console.log(numberOfReplies);
    }
  };

  const handleReplyComment = () => {
    let replyText = replyRef.current.value;
    setNumberOfReplies((prev) => prev + 1);
    replyRef.current.value = "";
    setReplies((prev) => [
      {
        _id: "PictureAsPdf",
        user_id: { username: authCtx.username },
        time: new Date(),
        comment: replyText,
      },
      ...prev,
    ]);
    if (!showReply) {
      setShowReply(true);
    }
  };

  const sendReplyHandler = async () => {
    try {
      const replyText = replyRef.current.value;
      const data = {
        commentid: props.id,
        userid: authCtx.userID,
        comment: replyText,
      };

      var config = {
        method: "post",
        url: "http://api.bakarya.com/api/comment/reply",
        headers: {
          "x-access-token": authCtx.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setNumberOfReplies((prev) => prev + 1);
          replyRef.current.value = "";
          setReplies((prev) => [
            {
              _id: "PictureAsPdf",
              user_id: { username: authCtx.username },
              time: new Date(),
              comment: replyText,
            },
            ...prev,
          ]);
          console.log(response);

          if (!showReply) {
            setShowReply(true);
          }
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <Stack
        justifyContent='flex-start'
        alignItems='center'
        direction='row'
        spacing={0.8}
        paddingX='10px'
        key={props.id}
      >
        <Avatar variant='circular' sx={{ width: "35px", height: "35px" }} />
        <Stack alignItems='flex-start'>
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
                {props.username}
              </Typography>
              <Typography variant='body1' fontSize='15px'>
                {props.comment}
              </Typography>
            </Stack>
          </Paper>
          <Stack direction='row' justifyContent='space-between' width='100%'>
            <Button
              size='small'
              onClick={handleReply}
              startIcon={
                <ReplyIcon sx={{ transform: "scale(-1,-1)", color: "black" }} />
              }
              disableRipple
              sx={{
                color: "black",
                fontSize: "10px",
                "&:hover": {
                  textDecoration: "underline",
                  bgcolor: "unset",
                },
              }}
            >
              Reply
            </Button>
            <Typography variant='caption' fontSize='10px'>
              {props.time}
            </Typography>
          </Stack>
          {numberOfReplies !== 0 && (
            <Button
              size='small'
              onClick={handleShowReply}
              sx={{
                width: "fit-content",
                color: "black",
                fontSize: "12px",
                textTransform: "capitalize",
                "&:hover": {
                  bgcolor: "unset",
                  textDecoration: "underline",
                },
              }}
            >
              {!showReply ? `Show ${numberOfReplies} replies` : "Show less"}
            </Button>
          )}
        </Stack>
      </Stack>
      {isReply && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={1}
          alignSelf='start'
          justifyContent='flex-start'
          sx={{ marginY: "10px", width: "1", paddingLeft: "30px" }}
        >
          <Avatar sx={{ width: "30px", height: "30px" }} />
          <Input
            inputRef={replyRef}
            onChange={handleChangeReply}
            placeholder={`Reply to ${props.username}`}
            onKeyDown={handlePressEnter}
            endAdornment={
              <IconButton onClick={sendReplyHandler}>
                <SendIcon />
              </IconButton>
            }
            sx={{
              "& ::placeholder": { fontSize: "14px" },
              minWidth: "400px",
            }}
          />
        </Stack>
      )}
      {showReply && <ReplyComments replies={replies} />}
    </React.Fragment>
  );
};

export default Comment;
