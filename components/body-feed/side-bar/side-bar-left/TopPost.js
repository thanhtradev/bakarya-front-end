import { List, Typography } from "@mui/material";
import React, { useEffect, useState, lazy } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import CenteredLoadingCircular from "../../../ui/CenteredLoadingCircular";
const PostItem = dynamic(() => import("./PostItem"), {
  loading: () => <CenteredLoadingCircular />,
});

const ItemContainer = dynamic(() => import("../ItemContainer"), {
  loading: () => <CenteredLoadingCircular />,
});

const TopPost = ({ top10Posts }) => {
  const [postLists, setPostLists] = useState(top10Posts.slice(0, 4));
  const first5Post = top10Posts.slice(0, 4);

  const postList = first5Post.map((post) => {
    return (
      <React.Suspense key={post.id} fallback={<CenteredLoadingCircular />}>
        <PostItem
          postID={post.id}
          author={post.author}
          name={post.name}
          createAt={post.createdAt}
          numberOfLike={post.number_of_mlems}
          numberOfComments={post.number_of_comments}
        />
      </React.Suspense>
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
