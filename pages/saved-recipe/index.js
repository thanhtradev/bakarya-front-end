import React, { useEffect, useState } from "react";
import RecipePost from "../../components/recipe-post/RecipePost";
import axios from "axios";
import { Stack, Typography } from "@mui/material";

const SavedRecipePage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {});

  const savedRecipeList = savedRecipes.map((map) => {});

  return (
    <>
      {!isLoading && savedRecipeList.length === 0 ? (
        <Stack alignItems='center' sx={{ width: "1", height: "1" }}>
          <Typography variant='h4' color='#888'>
            You haven&apos;t saved anything yet
          </Typography>
        </Stack>
      ) : (
        { savedRecipeList }
      )}
    </>
  );
};

export default SavedRecipePage;
