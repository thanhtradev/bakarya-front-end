import React from "react";
import { useRef, useState } from "react";
import { useContext, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Stack, Avatar, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import LoadingButton from "@mui/lab/LoadingButton";
import FormData from "form-data";

const AvatarUser = () => {
  const avatarFile = useRef();
  const [avatarSrc, SetAvatarSrc] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    GetAvatar();
  }, []);

  const onChangeAvatarFile = async () => {
    try {
      const formData = new FormData();

      setIsUploading(true);

      formData.append("avatar", avatarFile.current.files[0]);

      const res = await axios({
        method: "post",
        url: "http://api.bakarya.com/api/user/update/avatar",
        headers: {
          "x-access-token": authCtx.token,
        },
        data: formData,
      });

      SetAvatarSrc(URL.createObjectURL(avatarFile.current.files[0]));

      console.log(res.data);
    } catch (error) {
      alert(error);
    }
    setIsUploading(false);
  };

  const GetAvatar = () => {
    var config = {
      method: "get",
      url: "http://api.bakarya.com/api/user/avatar",
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    axios(config)
      .then(function (response) {
        const { avatar_url } = response.data;
        SetAvatarSrc((prev) => avatar_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //* function change array of buffer to string
  //* for more information
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const handleUploadAvatar = () => {
    avatarFile.current.click();
  };
  return (
    <Grid
      item
      xs={4}
      direction='column'
      justifyContent='space-evenly'
      alignItems='center'
      sx={{
        position: "relative",
        // bgcolor: "cadetblue",
        direction: "column",
      }}
    >
      <Stack justifyContent='center' alignItems='center' sx={{ height: "1" }}>
        <Stack
          alignItems='center'
          sx={{
            position: "absolute",
            top: "-70px",
            right: 0,
            left: 0,
          }}
        >
          <Avatar
            sx={{
              width: "113px",
              height: "113px",
              border: "3px solid white",
              zIndex: 100,
            }}
            src={avatarSrc}
          />
        </Stack>
        {isUploading ? (
          <LoadingButton
            loading
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='outlined'
          >
            Uploading
          </LoadingButton>
        ) : (
          <Button onClick={handleUploadAvatar}>Upload a photo</Button>
        )}
        <input
          type='file'
          name='avatar'
          accept='image/*'
          ref={avatarFile}
          style={{ display: "none" }}
          onChange={onChangeAvatarFile}
        />
      </Stack>
    </Grid>
  );
};

export default AvatarUser;
