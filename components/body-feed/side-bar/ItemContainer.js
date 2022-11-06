import { Box } from "@mui/material";

const ItemContainer = ({ children }) => {
  return (
    <Box
      className='row'
      sx={{
        // height: "0.6",
        width: "0.8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "300px",
        borderRadius: "18px",
        padding: "10px 0",
        marginBottom: "10px",
        // backgroundColor: "indigo",
        border: "1px solid rgba(106, 125, 155, 0.3)",
      }}
    >
      {children}
    </Box>
  );
};

export default ItemContainer;
