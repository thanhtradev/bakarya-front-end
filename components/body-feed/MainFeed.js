import { Col, Container } from "react-bootstrap";
import CreatePost from "./create-post/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../recipe-post/recipe-post-minimize/RecipePostMiniminze";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const MainFeed = ({ posts: recipePost }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [posts, setPosts] = useState(recipePost);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authCtx.isLoggedIn);
    setPosts((prev) => prev.reverse());
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

  return (
    <Col xl={6} fluid='true'>
      <Container
        fluid='lg'
        style={{
          padding: "0 20px",
        }}
      >
        {isLoggedIn && <CreatePost handleCreatedPost={handleCreatedPost} />}

        {recipePosts}

        {/* <InfiniteScroll
          dataLength={post.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items}
        </InfiniteScroll> */}
      </Container>
    </Col>
  );
};

export default MainFeed;
