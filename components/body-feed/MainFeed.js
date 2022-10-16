import { Col, Container } from "react-bootstrap";
import CreatePost from "./create-post/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../recipe-post/recipe-post-minimize/RecipePostMiniminze";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

const MainFeed = () => {
  const router = useRouter();

  useEffect(() => {
    FetchPost();
  }, []);

  const { category } = router.query;
  console.log(category);

  function FetchPost() {
    var config = {
      method: "get",
      url: "http://api.bakarya.com/api/recipes",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    FetchPost();
  }, []);

  return (
    <Col xl={6} fluid='true'>
      <Container
        fluid='lg'
        style={{
          padding: "0 20px",
        }}
      >
        <CreatePost />
        <Post />

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
