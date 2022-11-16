import axios from "axios";
import _Post from "../../components/recipe-post/RecipePost";
// import SideBarLeft from "../../components/body-feed/side-bar/side-bar-left/SideBarLeft";
// import SideBarRight from "../../components/body-feed/side-bar/side-bar-right/SideBarRight";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { set } from "nprogress";
import { useRouter } from "next/router";

export default function Post({ post1 }) {
  const router = useRouter();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { postid } = router.query;

  useEffect(() => {
    if (postid) {
      axios
        .get(`http://api.bakarya.com/api/recipes/id/${postid}`)
        .then((data) => {
          setIsLoading(false);
          setPost((prev) => data.data);
          console.log(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [postid, router]);

  return (
    <>
      {!isLoading && (
        <_Post
          initialShowComment={true}
          key={post.id}
          postID={post.id}
          author={post.author}
          category={post.categories}
          authorID={post.author_id}
          createAt={post.createdAt}
          directions={post.directions}
          author_avatar={post.author_avatar}
          images={post.images}
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
      )}
    </>
  );
}
