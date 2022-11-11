import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CardMedia, Typography } from "@mui/material";
import { useState } from "react";

export default function PostImages({ images }) {
  const [postImages, setPostImages] = useState(images);
  const imgList =
    postImages !== undefined ? (
      postImages.map((item) => {
        if (item === postImages[0]) {
          return (
            <ImageListItem
              key={item}
              rows={2}
              cols={parseInt(`${postImages.length === 1 ? "3" : "1"}`)}
            >
              <CardMedia
                image={item}
                sx={{
                  height: `${postImages.length === 1 ? "400px" : "400px"}`,
                  borderRadius: "10px",
                }}
              />
            </ImageListItem>
          );
        }
        return (
          <ImageListItem key={item.img} rows={1}>
            <img
              src={`${item}?w=248&fit=crop&auto=format`}
              srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
              style={{ borderRadius: "10px", height: "100px" }}
            />
          </ImageListItem>
        );
      })
    ) : (
      <Box sx={{ width: "1", height: "10px" }} />
    );

  return (
    <Box sx={{ height: "fit-content", width: 1, paddingX: "10px" }}>
      <ImageList gap={8} sx={{ height: 1 }} rowHeight={200}>
        {imgList}
      </ImageList>
    </Box>
  );
}
