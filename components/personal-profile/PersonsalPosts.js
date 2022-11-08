import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Post from "../recipe-post/RecipePost";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import CreatePost from "../body-feed/create-post/CreatePost";

const PersonalPosts = () => {
  const [posts, setPosts] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetchPersonalPost();
    console.log("i logged");
  }, []);

  const fetchPersonalPost = async () => {
    try {
      var config = {
        method: "get",
        url: "http://api.bakarya.com/api/recipes/user/",
        headers: {
          "x-access-token": authCtx.token,
        },
      };

      const personalPostURL = "http://api.bakarya.com/api/recipes/user/";
      const personalPost = await axios(config);
      setPosts(() => personalPost.data);
    } catch (error) {
      console.log(error);
    }
  };

  const recipePosts = posts.slice(0, 5).map((post) => {
    return (
      <Post
        key={post.id}
        width='100%'
        postID={post.id}
        author={post.author}
        category={post.categories}
        createAt={post.createdAt}
        directions={post.directions}
        expert={post.expert}
        ingredient={post.ingredients}
        makes={post.makes}
        name={post.name}
        numberOfComment={post.number_of_comments}
        numberOfLike={post.number_of_mlems}
        nutrition={post.nutrition}
        makingTime={post.time}
        updateAt={post.updatedAt}
      />
    );
  });

  return (
    <Stack width='100%' justifyContent='center' alignItems='center' padding={0}>
      <CreatePost />
      {recipePosts.length == 0 ? (
        <Box sx={{ width: "1", textAlign: "center" }}>
          <Typography variant='h4' fontWeight='bold' color='#666'>
            Share your first post with us
          </Typography>
        </Box>
      ) : (
        recipePosts
      )}
    </Stack>
  );
};

export default PersonalPosts;
