import { useEffect } from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import PostHeader from "../PostHeader";
import classes from "./../RecipePost.module.css";
import Pic from "../../../assets/Demo.jpg";
import Interactions from "../Interaction";
import React, { useContext, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AuthContext from "../../../store/auth-context";

const MiniRecipePost = (props) => {
  const authCtx = useContext(AuthContext);
  const [isShowMore, setIsShowMore] = useState(false);
  let isLoggedIn = false;

  useEffect(() => {
    isLoggedIn = authCtx.isLoggedIn;
    console.log(isLoggedIn);
  }, []);

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
    <Box className={classes.post}>
      <Stack sx={{ paddingX: "13px", paddingTop: "4px" }} spacing={1.5}>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: "100%" }}
        >
          <PostHeader createAt={props.createAt} author={props.author} />
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
          <img src={Pic.src} className={classes["post-media"]} />
        </Box>
        <Interactions
          postId={props.postID}
          numberOfLike={props.numberOfLike}
          numberOfComment={props.numberOfComment}
        />
      </Stack>
    </Box>
  );
};

export default React.memo(MiniRecipePost);
