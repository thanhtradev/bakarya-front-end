import React from "react";
import {
  Typography,
  CardMedia,
  CardHeader,
  Card,
  CardActionArea,
} from "@mui/material";

const Product = (props) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: "1",
        height: "7rem",
        marginBottom: "8px",
        bgcolor: "transparent",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "1",
          height: "1",
          // borderBottom: "1px solid #888",
          padding: "5px",
        }}
      >
        <CardMedia
          component='img'
          image={props.img}
          src={props.img}
          sx={{ width: "0.6", height: "6.3rem" }}
        />
        <CardHeader
          title={props.title}
          titleTypographyProps={{
            fontSize: "0.85em",
          }}
          subheader={
            <React.Fragment>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {props.subtitle}
              </Typography>
              <Typography
                sx={{ fontSize: "0.75em" }}
              >{`${props.price}$`}</Typography>
            </React.Fragment>
          }
          subheaderTypographyProps={{
            fontSize: "1rem",
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default Product;
