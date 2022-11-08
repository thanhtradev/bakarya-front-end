import Head from "next/head";
import styles from "../styles/Home.module.css";
import AuthContext from "../store/auth-context";
import Body from "../components/body-feed/Body";
import axios from "axios";
import { useContext } from "react";

export default function Home({ posts }) {
  return (
    <div className={styles.container} style={{ padding: 0 }}>
      <Head>
        <meta charSet='UTF-8' />
        <title>Bakarya</title>
        <meta name='description' content='A social network for bakers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Body posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const first3PostURL = "http://api.bakarya.com/api/recipes/random";

    const postData = await axios.get(first3PostURL);

    return {
      props: {
        posts: postData.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      posts: [],
    },
  };
}
