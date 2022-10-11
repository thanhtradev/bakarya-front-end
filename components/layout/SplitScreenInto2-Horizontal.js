import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const SplitScreenInto2Horizontal = ({ children }) => {
  return (
    <Grid2 container sx={{ height: "100vh" }}>
      {children}
    </Grid2>
  );
};

export default SplitScreenInto2Horizontal;
