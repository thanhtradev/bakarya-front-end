import ItemContainer from "../ItemContainer";
import { List, Typography } from "@mui/material";
import PostItem from "./PostItem";
import React from "react";

const TopPost = ({ top10Posts }) => {
  const first5Post = top10Posts.slice(0, 4);

  const postList = first5Post.map((post) => {
    return (
      <PostItem
        key={post.id}
        author={post.author}
        name={post.name}
        createAt={post.createdAt}
        numberOfLike={post.number_of_mlems}
        numberOfComment={post.number_of_comments}
      />
    );
  });

  return (
    <ItemContainer>
      <Typography
        variant='h5'
        sx={{
          fontWeight: "bolder",
          lineHeight: "1.4",
        }}
      >
        Most mlem posts
      </Typography>
      <List>{postList}</List>
    </ItemContainer>
  );
};

export default TopPost;
