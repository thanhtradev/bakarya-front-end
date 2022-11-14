import { List, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import CenteredLoadingCircular from "../../../ui/CenteredLoadingCircular";
import SadFaceIcon from "@mui/icons-material/SentimentVeryDissatisfied";
const PostItem = dynamic(() => import("./PostItem"), {
  loading: () => <CenteredLoadingCircular />,
});

const ItemContainer = dynamic(() => import("../ItemContainer"), {
  loading: () => <CenteredLoadingCircular />,
});

const TopPost = ({ top10Posts }) => {
  const first5Post = top10Posts.slice(0, 4);

  const postList = first5Post.map((post) => {
    return (
      <React.Suspense key={post.id} fallback={<CenteredLoadingCircular />}>
        <PostItem
          postID={post.id}
          author={post.author}
          author_avatar={post.author_avatar}
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
      {postList.length !== 0 ? (
        <List>{postList}</List>
      ) : (
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{ width: "100%", height: "200px" }}
        >
          <Typography variant='h5' color='#888' textAlign='center'>
            Nothing to show <SadFaceIcon />
          </Typography>
        </Stack>
      )}
    </ItemContainer>
  );
};

export default TopPost;
