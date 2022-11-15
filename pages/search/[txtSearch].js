import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RecipePost from "../../components/recipe-post/RecipePost";
import { Stack, Typography } from "@mui/material";
import CenteredLoadingCircular from "../../components/ui/CenteredLoadingCircular";
import AuthContext from "../../store/auth-context";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [searchTxt, setSearchTxt] = useState(router.query.txtSearch);
  const [foundPosts, setFoundPost] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (router.query.txtSearch === "random") {
      fetchRandom();
    } else {
      fetchFindPost();
    }
  }, [router.query.txtSearch]);

  const fetchRandom = async () => {
    try {
      setIsLoading(true);

      //* reset found post
      setFoundPost([]);

      var config = {
        method: "get",
        url: "http://api.bakarya.com/api/recipes/random",
        headers: {
          "x-access-token": authCtx.token,
        },
      };

      const res = await axios(config);
      // console.log(res.data);

      setFoundPost((prev) => res.data);
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  // const posts = foundPosts.map((post) => (
  //   <RecipePost
  //     key={post.id}
  //     postID={post.id}
  //     images={post.images}
  //     author={post.author}
  //     authorID={post.author_id}
  //     category={post.categories}
  //     createAt={post.createdAt}
  //     directions={post.directions}
  //     author_avatar={post.author_avatar}
  //     expert={post.expert}
  //     width='100%'
  //     ingredient={post.ingredients}
  //     makes={post.makes}
  //     name={post.name}
  //     numberOfComment={post.number_of_comments}
  //     numberOfLike={post.number_of_mlems}
  //     nutrition={post.nutrition}
  //     makingTime={post.time}
  //     updateAt={post.updatedAt}
  //   />
  // ));
  const posts =
    foundPosts.length !== 0 ? (
      foundPosts.map((post) => (
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
          width='100%'
          ingredient={post.ingredients}
          makes={post.makes}
          name={post.name}
          numberOfComment={post.number_of_comments}
          numberOfLike={post.number_of_mlems}
          nutrition={post.nutrition}
          makingTime={post.time}
          updateAt={post.updatedAt}
        />
      ))
    ) : (
      <Stack width='100%' alignItems='center' justifyContent='start'>
        <h3> {`Nothing match your search : ${router.query.txtSearch}`}</h3>
      </Stack>
    );

  const fetchFindPost = async () => {
    try {
      //* reset found post
      console.log("i ran in find");
      setFoundPost([]);
      setIsLoading(true);
      var config = {
        method: "get",
        url: `http://api.bakarya.com/api/recipes/category/${router.query.txtSearch}`,
        headers: {
          // "x-access-token": authCtx.token,
        },
      };

      const res = await axios(config);
      setFoundPost((prev) => {
        console.log(res.data);
        return res.data;
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Search page</title>
      </Head>
      {!isLoading && foundPosts.length !== 0 && (
        <Typography
          variant='h4'
          alignSelf='start'
        >{`Your search result: ${router.query.txtSearch}`}</Typography>
      )}
      {isLoading ? <CenteredLoadingCircular /> : posts}
    </>
  );
};

export default Search;
