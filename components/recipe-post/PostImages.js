import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function PostImages() {
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80",
      title: "Bed",
    },
    {
      img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
      title: "Books",
    },
    {
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
      title: "Sink",
    },
  ];

  const imgList = itemData.map((item) => {
    if (item === itemData[0]) {
      return (
        <ImageListItem
          key={item.img}
          rows={2}
          cols={parseInt(`${itemData.length === 1 ? Interger.P : "1"}`)}
        >
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading='lazy'
            style={{
              borderRadius: "10px",
              height: `${itemData.length === 1 ? "400px" : "auto"}`,
            }}
          />
        </ImageListItem>
      );
    }
    return (
      <ImageListItem key={item.img} rows={1}>
        <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading='lazy'
          style={{ borderRadius: "10px", height: "100px" }}
        />
      </ImageListItem>
    );
  });

  return (
    <Box sx={{ height: "fit-content", width: 1, paddingX: "10px" }}>
      <ImageList gap={8} sx={{ height: 1 }} rowHeight={200}>
        {imgList}
      </ImageList>
    </Box>
  );
}
