import {
  Stack,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  TextField,
  OutlinedInput,
  Button,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import Comments from "../recipe-post/Comments";
import classes from "./Comments.module.css";
import ProductQuantity from "./ProductQuantity";

const ProductDetail = ({ id, img, name, quantity, price, description }) => {
  const [testComment, setTestComment] = useState([]);
  const [totalPrice, setTotalPrice] = useState(price);
  const initState = { pricePerUnit: price, totalPrice: price };
  //   const [totalPrice, dispatchTotalPrice] = useReducer(priceReducer, initState);

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      setTestComment((prev) =>
        prev.concat(
          <Stack
            justifyContent='flex-start'
            alignItems='center'
            direction='row'
            spacing={0.8}
            paddingX='10px'
            key={Math.random() * 100}
          >
            <Avatar variant='circular' sx={{ width: "35px", height: "35px" }} />
            <Stack alignItems='flex-start'>
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
                    {`test`}
                  </Typography>
                  <Typography variant='body1' fontSize='15px'>
                    {`test`}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Stack>
        )
      );
    }
  }, []);

  const handleIncreaseTotalPrice = (quantity) => {
    setTotalPrice((prev) => quantity);
  };

  return (
    <Card
      component={Stack}
      direction='row'
      sx={{ height: "30rem", width: "50rem", padding: "10px" }}
      spacing={2}
    >
      <CardMedia
        component='img'
        height='100%'
        image='https://images.unsplash.com/photo-1667213768683-278bcfce53cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
        alt='green iguana'
        sx={{ backgroundSize: "cover", width: "0.5", borderRadius: "10px" }}
      />
      <CardContent
        component={Stack}
        alignContent='center'
        justifyContent='space-between'
        sx={{ width: "0.5" }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Stack
            component='span'
            alignItems='flex-start'
            maxWidth='0.85'
            spacing={1.2}
          >
            <Typography variant='h6' fontWeight='bold' height='100%'>
              {name}
            </Typography>
          </Stack>
          <Stack component='span' alignItems='flex-start'>
            <Typography
              variant='h5'
              fontWeight='bold'
              height='100%'
              textAlign='center'
              padding='0'
            >
              {`${price} $`}
            </Typography>
          </Stack>
        </Stack>
        <Typography paragraph>{description}</Typography>
        <Box>
          <Divider>Comments</Divider>
          <Stack
            spacing={1}
            className={classes["comment"]}
            sx={{ maxHeight: "10rem", width: "1", overflowY: "scroll" }}
          >
            {testComment}
          </Stack>
        </Box>
        <Stack
          direction='row'
          width='100%'
          justifyContent='space-between'
          height='2.5rem'
        >
          <ProductQuantity
            maxQuantity={quantity}
            onChangeQuantity={handleIncreaseTotalPrice}
            price={price}
          />
          <Button
            variant='contained'
            sx={{
              fontSize: "11px",
              height: "2.33rem",
            }}
          >
            {`Add to cart ${totalPrice} $`}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
