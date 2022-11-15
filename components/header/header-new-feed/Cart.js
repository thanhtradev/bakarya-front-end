import { Badge, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Link from "next/link";
import classes from "./header.module.css";
import { useSelector } from "react-redux";
const MyBtn = styled(Button)({
  height: "40px",
  width: "40px",
  padding: "0",
});

const Cart = () => {
  const userSlice = useSelector((state) => state.userSlice.cart);
  return (
    <Box
      component={MyBtn}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "40px",
        height: "40px",
        padding: "0",
        color: "#333",
        "& :hover": {
          color: "white",
        },
        margin: "0 10px",
      }}
    >
      <Badge badgeContent={0} color="primary">
        <Link href="/checkout">
          <ShoppingCartOutlinedIcon />
        </Link>
        {userSlice.length > 0 && (
          <div className={classes["red-cart"]}>{userSlice.length}</div>
        )}
      </Badge>
    </Box>
  );
};

export default Cart;
