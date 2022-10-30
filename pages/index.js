import Head from "next/head";
import styles from "../styles/Home.module.css";
import AuthContext from "../store/auth-context";
import Body from "../components/body-feed/Body";
import { Box } from "@mui/material";
import axios from "axios";

export default function Home({ posts, top10Posts }) {
  return (
    <div className={styles.container} style={{ padding: 0 }}>
      <Head>
        <meta charSet='UTF-8' />
        <title>Bakarya</title>
        <meta name='description' content='A social network for bakers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Body posts={posts} top10Posts={top10Posts} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const allPostURL = "http://api.bakarya.com/api/recipes";
    const top10PostURL = "http://api.bakarya.com/api/recipes/top10";

    const postData = await axios.get(allPostURL);
    const top10PostData = await axios.get(top10PostURL);

    return {
      props: {
        posts: postData.data,
        top10Posts: top10PostData.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      posts: [],
      top10Posts: [],
    },
  };
}
