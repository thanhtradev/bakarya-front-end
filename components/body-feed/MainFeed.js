import { Col, Container } from "react-bootstrap";
import CreatePost from "./create-post/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../recipe-post/recipe-post-minimize/RecipePostMiniminze";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const MainFeed = ({ posts: recipePost }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(recipePost);

  const { category } = router.query;
  console.log(recipePost);
  const recipePosts = recipePost.map((post) => {
    return (
      <Post
        key={post._id}
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
        <CreatePost />
        {recipePosts}

        {/* <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
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
