import ItemContainer from "../ItemContainer";
import { List, Typography } from "@mui/material";
import PostItem from "./PostItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TopPost = ({ top10Posts }) => {
  const [postLists, setPostLists] = useState(top10Posts.slice(0, 4));
  const first5Post = top10Posts.slice(0, 4);

  const postList = first5Post.map((post) => {
    return (
      <PostItem
        key={post.id}
        postID={post.id}
        author={post.author}
        name={post.name}
        createAt={post.createdAt}
        numberOfLike={post.number_of_mlems}
        // numberOfComment={numberOfComment}
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
