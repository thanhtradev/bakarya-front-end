import { Col, Container } from "react-bootstrap";
import CreatePost from "./create-post/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../recipe-post/RecipePost";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
import CenteredLoadingCircular from "../ui/CenteredLoadingCircular";

const MainFeed = ({ posts: recipePost }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [posts, setPosts] = useState(recipePost);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tries, setTries] = useState(0);
  useEffect(() => {
    setIsLoggedIn(authCtx.isLoggedIn);
    setPosts((prev) => prev);
  }, [posts]);

  const handleCreatedPost = async (newPosts) => {
    const allPostURL = "http://api.bakarya.com/api/recipes";
    const postData = await axios.get(allPostURL);

    postData.data, setPosts((prev) => [newPosts, ...postData.data]);
  };

  const recipePosts = posts.map((post) => {
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

  const fetchData = async () => {
    try {
      const postData = await axios({
        method: "get",
        url: "http://api.bakarya.com/api/recipes/suggestion",
        headers: {
          "x-access-token": authCtx.token,
        },
      });
      if (postData.data == null || postData.data.length === 0) {
        const retryFetch = setTimeout(() => {
          setTries((prev) => {
            if (prev === 3) {
              setHasMore(false);
              return 3;
            } else {
              fetchData(tries + 1);
              return prev + 1;
            }
          });
        }, 3000);

        //* clear time out if reached maximum of retries
        if (tries >= 3) {
          clearTimeout(retryFetch);
        }
      } else {
        console.log(postData.data);
        setPosts((prev) => prev.concat(postData.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack justify-content='center' alignItems='center' spacing={2}>
      {isLoggedIn && <CreatePost handleCreatedPost={handleCreatedPost} />}
      <InfiniteScroll
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "1",
          flexDirection: "column",
        }}
        dataLength={recipePosts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={
          <Box width={"40.57rem"}>
            <CenteredLoadingCircular />
          </Box>
        }
        endMessage={
          <Typography
            sx={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}
          >
            Yay! You have seen it all
          </Typography>
        }
      >
        <Stack justify-content='center' alignItems='center' spacing={2}>
          {recipePosts}
        </Stack>
      </InfiniteScroll>
    </Stack>
  );
};

export default MainFeed;
