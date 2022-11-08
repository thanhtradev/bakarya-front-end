import { Suspense, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, Container } from "@mui/material";
import ProductItem from "../ProductItem";
import { useRouter } from "next/router";
import CenteredLoadingCircular from "../../ui/CenteredLoadingCircular";

const ToolTab = ({ products }) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/shopping?page=1", undefined, { shallow: true });
  }, []);

  const showProducts = products.map((product) => (
    <ProductItem
      id={product._id}
      img={product.thumbnail}
      name={product.name}
      quantity={product.stock}
      price={product.price[0]}
      description={product.description}
      key={product._id}
    />
  ));

  return (
    <Grid
      component={Container}
      container
      spacing={3}
      sx={{
        height: "fit-content",
      }}
      columns={15}
      sm={15}
      disableGutters
    >
      {showProducts}
    </Grid>
  );
};

export default ToolTab;
