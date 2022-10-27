import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import _Post from "../../components/recipe-post/recipe-post-minimize/RecipePostMiniminze";
import SideBarLeft from "../../components/body-feed/side-bar/side-bar-left/SideBarLeft";
import SideBarRight from "../../components/body-feed/side-bar/side-bar-right/SideBarRight";
import React, { useState } from "react";
import { Stack } from "@mui/material";

export default function Post({ post }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  return (
    <Container fluid>
      <Row
        style={{
          paddingTop: "20px",
          backgroundColor: "#f4f4f4",
          padding: "20px 0 0 0",
        }}
      >
        {/* //? SideBar Left */}
        <Col>
          <SideBarLeft />
        </Col>
        <Col xl={6} fluid='true'>
          <Container
            fluid='lg'
            style={{
              padding: "0 20px",
            }}
          >
            <Stack justify-content='center' alignItems='center' spacing={2}>
              <_Post
                initialShowComment={true}
                key={post.id}
                postID={post.id}
                author='test'
                category={post.categories[0].name}
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
            </Stack>
          </Container>
        </Col>
        {/* //? SideBar Right */}
        <Col>
          <SideBarRight />
        </Col>
      </Row>
    </Container>
  );
}
export async function getStaticPaths() {
  const res = await axios.get("http://api.bakarya.com/api/recipes");
  const posts = res.data;
  const paths = posts.map((post) => ({
    params: {
      postid: post.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postId = JSON.parse(JSON.stringify(params.postid));
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await axios.get(`http://api.bakarya.com/api/recipes/${postId}`);
  const post = res.data;

  // Pass post data to the page via props
  return {
    props: {
      post: {
        id: post._id,
        // author: "test",
        // author: post.author,
        categories: post.categories,
        createdAt: post.createdAt,
        directions: post.directions,
        expert: post.expert,
        ingredients: post.ingredients,
        makes: post.makes,
        name: post.name,
        number_of_comments: post.number_of_comments,
        number_of_mlems: post.number_of_mlems,
        nutrition: post.nutrition,
        time: post.time,
        updatedAt: post.updatedAt,
      },
    },
  };
}
