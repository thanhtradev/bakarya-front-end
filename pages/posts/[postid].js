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

// export async function getStaticPaths() {
//   const res = await axios.get("http://api.bakarya.com/api/recipes");
//   const posts = res.data;
//   const paths = posts.map((post) => ({
//     params: {
//       postid: post.id,
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const postId = "6352cf513e3d5bb57cd96fca";
//   // const postId = JSON.parse(params.postid.toString());
//   // const postId = JSON.parse(JSON.stringify(params.postid);
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   // const res = await axios.get(`http://api.bakarya.com/api/recipes/${postId}`);
//   const res = await axios.get(
//     `http://api.bakarya.com/api/recipes/6352cf513e3d5bb57cd96fca`
//   );
//   const post = JSON.stringify(res.data);

//   // Pass post data to the page via props
//   return {
//     props: {
//       post: {
//         id: post.id,
//         // author: "test",
//         // author: post.author,
//         categories: post.categories,
//         createdAt: post.createdAt,
//         directions: post.directions,
//         expert: post.expert,
//         ingredients: post.ingredients,
//         makes: post.makes,
//         name: post.name,
//         number_of_comments: post.number_of_comments,
//         number_of_mlems: post.number_of_mlems,
//         nutrition: post.nutrition,
//         time: post.time,
//         updatedAt: post.updatedAt,
//       },
//     },
//   };
// }
