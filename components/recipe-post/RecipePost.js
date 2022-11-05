import { useCallback, useEffect } from "react";
import { Box, Typography, Stack, Chip, Divider, Button } from "@mui/material";
import PostHeader from "./PostHeader";
import classes from "./RecipePost.module.css";
import Pic from "../../assets/Demo.jpg";
import Interactions from "./Interaction";
import React, { useContext, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AuthContext from "../../store/auth-context";
import Comments from "./Comments";
import axios from "axios";
import CenteredLoadingCircular from "../ui/CenteredLoadingCircular";
import PostImages from "./PostImages";

const MiniRecipePost = (props) => {
  const authCtx = useContext(AuthContext);
  const [isShowMore, setIsShowMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(
    props.initialShowComment ?? false
  );
  const [numberOfComments, setNumberOfComments] = useState(
    props.numberOfComment
  );
  const [numberOfLikes, setNumberOfLikes] = useState(props.numberOfLike);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  useEffect(() => {
    getNumberOfLikes();
    setShowComments((prev) => props.initialShowComment ?? prev);
    getNumberOfComments();
    checkIfUserHasAlreadyLikedPost();
  }, [comments]);
  let isLoggedIn = false;

  useEffect(() => {
    isLoggedIn = authCtx.isLoggedIn;
  }, []);

  const checkIfUserHasAlreadyLikedPost = () => {
    var data = { recipeid: props.postID };

    var config = {
      method: "get",
      url: "http://api.bakarya.com/api/mlem/check",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNumberOfLikes = () => {
    var config = {
      method: "get",
      url: `http://api.bakarya.com/api/mlems/${props.postID}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setNumberOfLikes(response.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNumberOfComments = () => {
    var config = {
      method: "get",
      url: `http://api.bakarya.com/api/comments/${props.postID}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setNumberOfComments(response.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
    getComments();
  };

  const handleCloseComment = () => {
    setShowComments((prev) => !prev);
  };

  const getComments = async () => {
    try {
      setIsLoadingComment(true);

      const comment = await axios.get(
        `http://api.bakarya.com/api/comments/${props.postID}`
      );
      console.log(comment.data);
      setComments(comment.data.reverse());
      setIsLoadingComment(false);
    } catch (error) {
      alert(error);
    }
  };

  const showLessComment = () => {
    setShowComments(false);
  };

  const infos = [
    {
      content: props.category,
      icon: <MenuBookIcon />,
    },
    {
      content: props.makes,
      icon: <TakeoutDiningIcon />,
    },
    {
      content: props.makingTime,
      icon: <AccessTimeIcon />,
    },
  ];

  const infoList = infos.map((info, i) => {
    return (
      <Chip
        key={i}
        variant='outlined'
        size='small'
        label={info.content}
        icon={info.icon}
      />
    );
  });

  const ingredientList = props.ingredient.map((ingrd, i) => {
    return (
      <React.Fragment key={i}>
        <Typography component='li' variant='body2'>
          {ingrd}
        </Typography>
      </React.Fragment>
    );
  });

  const directionList = props.directions.map((dir, i) => {
    return (
      <React.Fragment key={i}>
        <Typography component='li' variant='body2'>
          {dir}
        </Typography>
      </React.Fragment>
    );
  });

  return (
    <Box className={classes.post} width={`${props.width ?? "93%"}`}>
      <Stack sx={{ paddingX: "13px", paddingTop: "4px" }} spacing={1.5}>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: "100%" }}
        >
          <PostHeader
            createAt={props.createAt}
            author={props.author}
            postID={props.postID}
          />
        </Stack>
        <Stack justifyContent='flex-start' alignItems='flex-start'>
          <Typography variant='h6' fontWeight='bold' fontSize='15x'>
            {props.name}
          </Typography>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={1.1}
            sx={{
              paddingTop: "4px",
              paddingBottom: "6px",
            }}
          >
            {infoList}
          </Stack>
          <Typography
            variant='subtitle1'
            fontSize='12px'
            sx={{
              color: "#6c6c6c",
              borderLeft: "2px solid #6c6c6c",
              paddingLeft: "6px",
            }}
          >
            {props.expert}
          </Typography>
          {!isShowMore && (
            <Chip
              label='Show more'
              variant='outlined'
              onClick={() => {
                setIsShowMore((prev) => !prev);
              }}
              size='small'
              sx={{ marginTop: "8px" }}
            />
          )}
          {isShowMore && (
            <React.Fragment>
              <Typography variant='h6'>Ingredients</Typography>
              <Box component='ul'>{ingredientList}</Box>
              <Typography variant='h6'>Directions</Typography>
              <Box component='ol'>{directionList}</Box>
              <Typography variant='h6'>Nutrition</Typography>
              <Typography paragraph={true} variant='body2'>
                {props.nutrition}
              </Typography>
            </React.Fragment>
          )}
        </Stack>
        {isShowMore && (
          <Chip
            label='Show less'
            variant='outlined'
            onClick={() => {
              setIsShowMore((prev) => !prev);
            }}
            size='small'
            sx={{ marginTop: "8px" }}
          />
        )}
        <Box className={classes["post-media"]}>
          <PostImages />
        </Box>
        <Interactions
          onShowComments={handleToggleComments}
          onCloseComments={showLessComment}
          getComments={getComments}
          postId={props.postID}
          numberOfLike={numberOfLikes}
          numberOfComment={numberOfComments}
        />

        {showComments && (
          <React.Fragment>
            <Divider sx={{ color: "#a1a1a1", fontSize: "14px" }}>
              Comment
            </Divider>
            <Comments
              recipeId={props.postID}
              comments={comments}
              onGetComments={getComments}
            />
          </React.Fragment>
        )}
        {isLoadingComment && (
          <Box sx={{ width: "1", height: "40px" }}>
            <CenteredLoadingCircular />
          </Box>
        )}
        {showComments && comments.length !== 0 ? (
          <Button onClick={showLessComment}>Show less</Button>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default MiniRecipePost;
