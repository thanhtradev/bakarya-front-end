import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Post from "../recipe-post/recipe-post-minimize/RecipePostMiniminze";
import axios from "axios";

const PersonalPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchTop5Post();
  }, []);

  const fetchTop5Post = async () => {
    try {
      const top10PostURL = "http://api.bakarya.com/api/recipes/top10";
      const top10PostData = await axios.get(top10PostURL);

      setPosts(() => top10PostData.data);
    } catch (error) {
      alert(error);
    }
  };

  const recipePosts = posts.slice(0, 5).map((post) => {
    return (
      <Post
        key={post.id}
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
    <Stack
      width='100%'
      justify-content='center'
      alignItems='flex-start'
      padding={0}
    >
      {recipePosts}
    </Stack>
  );
};

export default PersonalPosts;
