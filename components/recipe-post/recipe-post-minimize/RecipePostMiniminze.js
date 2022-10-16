import { Box, Typography, Stack, Chip } from "@mui/material";
import PostHeader from "../PostHeader";
import classes from "./../RecipePost.module.css";
import Pic from "../../../assets/logo.png";
import Interactions from "../Interaction";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";

const MiniRecipePost = (props) => {
  const categoryName = props.category[0].name;
  const [isShowMore, setIsShowMore] = useState(false);

  const infos = [
    {
      content: props.makes,
      icon: <TakeoutDiningIcon />,
    },
    {
      content: props.makingTime,
      icon: <AccessTimeIcon />,
    },
  ];

  const infoList = infos.map((info) => {
    return (
      <Chip
        variant='outlined'
        size='small'
        label={info.content}
        icon={info.icon}
      />
    );
  });

  const ingredientList = props.ingredient.map((ingrd) => {
    return (
      <React.Fragment>
        <Typography component='li' variant='body2'>
          {ingrd}
        </Typography>
      </React.Fragment>
    );
  });

  const directionList = props.directions.map((dir) => {
    return (
      <React.Fragment>
        <Typography component='li' variant='body2'>
          {dir}
        </Typography>
      </React.Fragment>
    );
  });

  console.log(props);
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
          <PostHeader createAt={props.createAt} />
        </Stack>
        <Stack justifyContent='flex-start' alignItems='flex-start'>
          <Typography variant='h5' fontWeight='bold' fontSize='18x'>
            {categoryName}
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
          <img src={Pic} className={classes["post-media"]} />
        </Box>
        <Interactions
          numberOfLike={props.numberOfLike}
          numberOfComment={props.numberOfComment}
        />
      </Stack>
    </Box>
  );
};

export default MiniRecipePost;
