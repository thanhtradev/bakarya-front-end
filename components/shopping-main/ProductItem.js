import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Card,
  CardActionArea,
  Container,
  CardContent,
  Typography,
  Stack,
  Button,
  CardMedia,
  Modal,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { Suspense, useEffect, useState } from "react";
import errorPic from "../../assets/Demo.jpg";
import ProductDetail from "./ProductDetail";

const ProductItem = ({ id, img, name, quantity, price, description }) => {
  const [imgSrc, setImgSrc] = useState(img);
  const [desc, setDesc] = useState(description);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (desc.length > 65) {
      setDesc(desc.slice(0, 65).concat("..."));
    } else if (desc.length === 0 || desc === "") {
      setDesc(
        "An awesome shorts for chillout and trips, blends in with anything"
      );
    }
  }, [desc]);

  const errorHandler = (e) => {
    setImgSrc(errorPic.src);
  };

  const handleOpenModel = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Stack
        component={Modal}
        justifyContent='center'
        alignItems='center'
        open={openModal}
        onClose={handleCloseModal}
      >
        <ProductDetail
          id={id}
          img={img}
          name={name}
          quantity={quantity}
          price={price}
          description={desc}
        />
      </Stack>
      <Grid
        item
        sm={6}
        md={3}
        sx={{
          padding: "20px",
        }}
      >
        <Card
          component={Stack}
          sx={{
            minHeight: "319px",
            width: "1",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack
            component={CardActionArea}
            onClick={handleOpenModel}
            justifyContent='space-evenly'
            sx={{ padding: 0, borderRadius: "10px" }}
          >
            <Suspense fallback={"Loading"}>
              <CardMedia
                component='img'
                onError={errorHandler}
                height='190'
                image={imgSrc}
                alt={name}
                sx={{ borderRadius: "10px" }}
              />
            </Suspense>
            <CardContent sx={{ paddingX: "0", minHeight: "88px" }}>
              <Typography
                variant='h6'
                fontSize={15}
                width='100%'
                fontWeight='bold'
                minHeight='48px'
              >
                {name}
              </Typography>
              <Typography
                paragraph
                variant='caption'
                color='rgba(3,3,3,0.5)'
                sx={{ margin: 0 }}
              >
                {desc}
              </Typography>
            </CardContent>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='caption'>{quantity} left </Typography>
            <Button
              sx={{ color: "#0d9cd2" }}
              startIcon={<AddShoppingCartIcon />}
            >
              {price} $
            </Button>
          </Stack>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default ProductItem;
