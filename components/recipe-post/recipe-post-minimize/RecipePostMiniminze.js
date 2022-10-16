import { Box, Typography, Stack } from "@mui/material";
import PostHeader from "../PostHeader";
import classes from "./../RecipePost.module.css";
import Pic from "../../../assets/logo.png";
import Interactions from "../Interaction";

const MiniRecipePost = (props) => {
  const categoryName = props.category[0].name;

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
        <Box className={classes["post-content"]}>
          <Typography variant='h5' fontWeight='bold' fontSize='18x'>
            {categoryName}
          </Typography>
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
        </Box>
        <Box className={classes["post-media"]}>
          <img src={Pic} className={classes["post-media"]} />
        </Box>
        <Interactions />
      </Stack>
    </Box>
  );
};

export default MiniRecipePost;
