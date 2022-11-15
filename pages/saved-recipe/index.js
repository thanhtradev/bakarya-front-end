import React, { useEffect, useState } from "react";
import RecipePost from "../../components/recipe-post/RecipePost";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Head from "next/head";

const SavedRecipePage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchSavedPost();
  }, []);

  const savedRecipeList = savedRecipes.map((post) => {
    return (
      <RecipePost
        key={post.id}
        postID={post.id}
        images={post.images}
        author={post.author}
        authorID={post.author_id}
        category={post.categories}
        createAt={post.createdAt}
        directions={post.directions}
        author_avatar={post.author_avatar}
        expert={post.expert}
        width="100%"
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

  const fetchSavedPost = async () => {
    setIsLoading(true);
    const url = "http://api.bakarya.com/api/user/saved";

    var config = {
      method: "get",
      url: url,
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    const res = await axios(config);
    setSavedRecipes((prev) => res.data);
    setIsLoading(true);
  };

  return (
    <>
      <Head>
        <title>Saved Recipe</title>
      </Head>
      {!isLoading && savedRecipeList.length === 0 ? (
        <Stack alignItems="center" sx={{ width: "1", height: "1" }}>
          <Typography variant="h4" color="#888">
            You haven&apos;t saved anything yet
          </Typography>
        </Stack>
      ) : (
        savedRecipeList
      )}
    </>
  );
};

export default SavedRecipePage;
