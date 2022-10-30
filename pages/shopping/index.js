import { Box, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ShoppingHeader from "../../components/header/header-shopping/HeaderShopping";
import ShoppingMain from "../../components/shopping-main/shopping-main";

export default function ShoppingPage({ products }) {
  const [isFetched, setIsFetched] = useState(false);

  return (
    <React.Fragment>
      <Head>
        <meta charSet='UTF-8' />
        <title>Bakarya Shop</title>
      </Head>
      <Container
        maxWidth='xl'
        disableGutters
        sx={{
          backgroundColor: "#7dc5e04d",
        }}
      >
        <ShoppingHeader />
        <ShoppingMain />
      </Container>
    </React.Fragment>
  );
}

ShoppingPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
