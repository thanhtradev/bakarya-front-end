import { Box, CircularProgress } from "@mui/material";

const CenteredLoadingCircular = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: props.height ?? "100px",
        width: props.width ?? "1",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CenteredLoadingCircular;
