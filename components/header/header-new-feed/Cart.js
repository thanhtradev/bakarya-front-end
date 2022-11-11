import { Badge, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const MyBtn = styled(Button)({
  height: "40px",
  width: "40px",
  padding: "0",
});

const Cart = () => {
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
      <Badge badgeContent={0} color='primary'>
        <ShoppingCartOutlinedIcon />
      </Badge>
    </Box>
  );
};

export default Cart;
