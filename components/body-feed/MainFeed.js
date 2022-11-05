import { Col, Container } from "react-bootstrap";
import CreatePost from "./create-post/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../recipe-post/RecipePost";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { Stack } from "@mui/material";
import CenteredLoadingCircular from "../ui/CenteredLoadingCircular";

const MainFeed = ({ posts: recipePost }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [posts, setPosts] = useState(recipePost);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authCtx.isLoggedIn);
    // setPosts((prev) => prev.reverse());
  }, []);

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
    const allPostURL = "http://api.bakarya.com/api/recipes/suggestion";
    const postData = await axios({
      method: "get",
      url: "http://api.bakarya.com/api/recipes/suggestion",
      headers: {
        "x-access-token": authCtx.token,
      },
    });
    console.log(authCtx.token);
    setPosts((prev) => prev.concat(postData.data));
    console.log("i ran");
  };

  return (
    <Stack justify-content='center' alignItems='center' spacing={2}>
      {isLoggedIn && <CreatePost handleCreatedPost={handleCreatedPost} />}
      {/* {recipePosts} */}
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
        hasMore={true}
        loader={<CenteredLoadingCircular />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Stack justify-content='center' alignItems='center' spacing={2}>
          {recipePosts}
          {console.log(recipePost.length)}
        </Stack>
      </InfiniteScroll>
    </Stack>
  );
};

export default MainFeed;
