import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

const ReplyComment = (props) => {
  return (
    <Stack
      justifyContent='flex-start'
      alignItems='center'
      direction='row'
      spacing={0.8}
      paddingX='10px'
      paddingLeft='20px'
      marginY='3px'
      key={props.id}
    >
      <Avatar variant='circular' sx={{ width: "30px", height: "30px" }} />
      <Stack alignItems='flex-end'>
        <Paper
          elevation={1}
          component={Stack}
          direction='row'
          alignItems='flex-start'
          spacing={2}
          justifyContent={"center"}
          paddingX='10px'
          sx={{ width: "1", bgcolor: "#e6e6e6" }}
        >
          <Stack
            justifyContent='space-evenly'
            alignItems='flex-start'
            sx={{ width: "fit-content" }}
          >
            <Typography variant='body1' fontWeight='bold' fontSize='13px'>
              {props.username}
            </Typography>
            <Typography variant='body1' fontSize='15px'>
              {props.comment}
            </Typography>
          </Stack>
        </Paper>
        <Typography variant='caption' fontSize='10px'>
          {props.time}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ReplyComment;
