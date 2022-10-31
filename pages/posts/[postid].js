import axios from "axios";
import _Post from "../../components/recipe-post/RecipePost";
// import SideBarLeft from "../../components/body-feed/side-bar/side-bar-left/SideBarLeft";
// import SideBarRight from "../../components/body-feed/side-bar/side-bar-right/SideBarRight";
import React from "react";
import Head from "next/head";

export default function Post({ post }) {
  return (
    <>
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
    </>
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
  // const postId = JSON.parse(JSON.stringify(params.postid);
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
