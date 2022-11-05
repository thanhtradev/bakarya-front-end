import { Box, Stack, Typography } from "@mui/material";

const ShoppingHeader = () => {
  return (
    <Stack
      justifyContent='space-between'
      alignItems='center'
      spacing={4}
      direction='row'
      sx={{
        width: "1",
        paddingX: "70px !important",
        height: "6.5rem",
        marginX: 0,
      }}
    >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
        sx={{
          height: "1",
          width: "fit-content",
          margin: 0,
        }}
      >
        <Box component='img' sx={{ height: "65px", width: "65px" }} />
        <Box component={Stack} alignItems='start' justifyContent='center'>
          <Typography variant='h6' fontWeight='bold'>
            Bakarya Shop
          </Typography>
          <Typography variant='subtitle2' sx={{ color: "#3f3f3fcf" }}>
            A preparation for your next cake
          </Typography>
        </Box>
      </Stack>
      <Stack maxWidth='350px' height='100%' paddingY='5px'>
        <Typography variant='button' fontWeight='bold'>
          About us
        </Typography>
        <Typography paragraph fontSize='14px' color='#2e3131'>
          We are an independent fashion store and we sale finely designed and
          handcrafted outfits for the best price. Browse our collection and
          discover our products
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ShoppingHeader;
