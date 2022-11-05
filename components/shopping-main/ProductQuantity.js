import {
  OutlinedInput,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import React, { useEffect, useRef, useState } from "react";

const ActionButton = ({ icon, action }) => {
  return (
    <IconButton sx={{ height: "30px", width: "30px" }} onClick={action}>
      {icon}
    </IconButton>
  );
};

const ProductQuantity = ({ maxQuantity, onChangeQuantity, price }) => {
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef();

  useEffect(() => {
    setQuantity(1);
  }, []);

  const handleAddQuantity = () => {
    const value = parseInt(quantityRef.current.value);
    if (value >= parseInt(maxQuantity)) {
      setQuantity(maxQuantity);
    } else {
      setQuantity((prev) => {
        //* get the lastest snap shot of quantity
        onChangeQuantity((prev + 1) * price);
        console.log(quantityRef.current.value);
        return prev + 1;
      });
    }
  };

  const handleMinusQuantity = () => {
    const value = parseInt(quantityRef.current.value);

    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity((prev) => {
        //* get the lastest snap shot of quantity
        onChangeQuantity((prev - 1) * price);
        return prev - 1;
      });
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);

    if (value > parseInt(maxQuantity)) {
      setQuantity(parseInt(maxQuantity));
    } else if (value >= 1) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }

    if (e.target.value !== "") {
      onChangeQuantity(value * price);
    }
  };

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <OutlinedInput
        value={quantity}
        inputRef={quantityRef}
        onChange={handleQuantityChange}
        startAdornment={
          <ActionButton icon={<AddIcon />} action={handleAddQuantity} />
        }
        endAdornment={
          <ActionButton icon={<RemoveIcon />} action={handleMinusQuantity} />
        }
        inputProps={{
          sx: {
            padding: 0,
            padding: 0,
            minWidth: "10px",
            maxWidth: "33px",
          },
          type: "number",
        }}
        sx={{
          height: "2.33rem",
          width: "fit-content",
          borderRadius: "30px",
        }}
      />
      <Typography variant='subtitle2'>{`${maxQuantity} left`}</Typography>
    </Stack>
  );
};

export default ProductQuantity;
