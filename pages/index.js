import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import HeaderNewsFeed from "../components/header/header-new-feed/header";
import Post from "../components/recipe-post/recipe-post-minimize/RecipePostMiniminze";
import Body from "../components/body-feed/Body";
import { Box } from "@mui/material";
import axios from "axios";

export default function Home({ posts }) {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className={styles.container} style={{ padding: 0 }}>
      <Head>
        <meta charSet='UTF-8' />
        <title>Bakarya</title>
        <meta name='description' content='A social network for bakers' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css'
          integrity='sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor'
          crossorigin='anonymous'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        sx={{
          width: "1",
          height: "57px",
        }}
      >
        <HeaderNewsFeed />
      </Box>

      <Body posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    var config = {
      method: "GET",
      url: "http://api.bakarya.com/api/recipes",
      headers: {},
    };

    const res = await axios.get("http://api.bakarya.com/api/recipes");
    // const datas = await res.data.json();

    return {
      props: {
        posts: res.data,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
