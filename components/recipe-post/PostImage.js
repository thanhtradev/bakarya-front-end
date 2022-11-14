import { ImageListItem } from "@mui/material";
import React from "react";
const FULL_ROWS = 2;

const PostImage = ({ rows, cols, children }) => {
  return (
    <ImageListItem rows={rows} cols={cols ? cols : 2}>
      {children}
    </ImageListItem>
  );
};

export default PostImage;
