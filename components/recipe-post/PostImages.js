import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import PostImage from "./PostImage";
import Image from "next/image";
const SINGLE_IMAGE = 1;
const FULL_ROWS = 2;
const HALF_ROWS = 1;
const FULL_COLS = 3;
const HALF_COLS = 1;

export default function PostImages({ images }) {
  const imgList =
    images !== undefined ? (
      images.map((item) => {
        //* first item
        if (item === images[0]) {
          if (images.length < 4) {
            return (
              <PostImage
                key={item}
                rows={FULL_ROWS}
                cols={images.length == FULL_ROWS ? HALF_COLS : FULL_COLS}
              >
                <CardMedia
                  image={images[0]}
                  sx={{
                    height: `410px`,
                    borderRadius: "10px",
                  }}
                />
              </PostImage>
            );
          } else {
            return (
              <PostImage key={item} rows={HALF_ROWS} cols={HALF_COLS}>
                <Image
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={item.title}
                  loading="lazy"
                  layout="fill"
                  style={{
                    borderRadius: "10px",
                    height: `${images.length == FULL_ROWS ? "100%" : "100px"}`,
                  }}
                />
              </PostImage>
            );
          }
        }
        //* end first item
        else {
          return (
            <PostImage
              key={item}
              rows={images.length == FULL_ROWS ? FULL_ROWS : HALF_ROWS}
              cols={HALF_COLS}
            >
              <Image
                src={`${item}`}
                srcSet={`${item}`}
                alt={item.title}
                layout="fill"
                loading="lazy"
                style={{
                  borderRadius: "10px",
                  height: `${images.length == FULL_ROWS ? "100%" : "100px"}`,
                }}
              />
            </PostImage>
          );
        }
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
