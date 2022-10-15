import { Stack } from "@mui/material";
import * as React from "react";
import Product from "./product/Product";

let pro1;
let pro2;

const AdList = () => {
  const [productList, setProductList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSuggestHandler();
  }, []);

  const fetchSuggestHandler = async () => {
    try {
      setIsLoading(false);
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      const productList = data.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
        };
      });
      setProductList(productList);
      pro1 = productList[0];
      pro2 = productList[1];
      setIsLoading(false);
    } catch (error) {
      console.log(error.messages);
      return;
    }
    setIsLoading(false);
  };

  if (!isLoading) {
    console.log("not loading");
  } else {
    console.log("loading");
  }

  return (
    <React.Fragment>
      {productList ? (
        <Stack
          alignItems='center'
          spacing={1.2}
          sx={{
            width: "1",
            height: "1",
            overflow: "auto",
          }}
        >
          <Product
            title={pro1?.title}
            subtitle={"shop123@vn.doc"}
            price={pro1?.price}
            img={pro1?.image}
          />
          <Product
            title={pro2?.title}
            subtitle={"shop123@vn.doc"}
            price={pro2?.price}
            img={pro2?.image}
          />
        </Stack>
      ) : (
        <Stack sx={{ width: "21rem", height: "84vh" }}></Stack>
      )}
    </React.Fragment>
  );
};

export default AdList;
