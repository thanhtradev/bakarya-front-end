import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Post from "../recipe-post/RecipePost";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import CreatePost from "../body-feed/create-post/CreatePost";
import CenteredLoadingCircular from "../ui/CenteredLoadingCircular";

const PersonalPosts = ({ userid, showCreatePost }) => {
  const [posts, setPosts] = useState([]);
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchPersonalPost();
  }, []);

  const fetchPersonalPost = async () => {
    try {
      setIsLoading(true);
      var config = {
        method: "get",
        url: `http://api.bakarya.com/api/recipes/userid/${userid}`,
        headers: {},
      };

      const personalPost = await axios(config);
      setPosts(() => personalPost.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const recipePosts = posts.map((post) => {
    return (
      <Post
        key={post.id}
        width='100%'
        postID={post.id}
        author={post.author}
        authorID={post.author_id}
        category={post.categories}
        createAt={post.createdAt}
        directions={post.directions}
        expert={post.expert}
        ingredient={post.ingredients}
        makes={post.makes}
        name={post.name}
        images={post.images}
        numberOfComment={post.number_of_comments}
        numberOfLike={post.number_of_mlems}
        nutrition={post.nutrition}
        author_avatar={post.author_avatar}
        makingTime={post.time}
        updateAt={post.updatedAt}
        followButtonDisplay={"none"}
        displayReport={"none"}
      />
    );
  });

  return (
    <Stack width='100%' justifyContent='center' alignItems='center' padding={0}>
      <CreatePost showCreatePost={showCreatePost} />
      {!isLoading && recipePosts.length == 0 ? (
        <Box sx={{ width: "1", textAlign: "center" }}>
          <Typography variant='h4' fontWeight='bold' color='#666'>
            Share your first post with us
          </Typography>
        </Box>
      ) : (
        recipePosts
      )}
      {isLoading && <CenteredLoadingCircular />}
    </Stack>
  );
};

export default PersonalPosts;
