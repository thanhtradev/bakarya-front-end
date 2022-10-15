import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container component='footer' sx={{ width: "1" }}>
      <Typography
        sx={{
          width: "1",
          fontSize: "0.7em",
        }}
        noWrap={true}
        textAlign='center'
      >
        Copyright 2022 ©BakaryaTeam
      </Typography>
      <Typography sx={{ width: "1", fontSize: "0.7em" }} textAlign='center'>
        Support | Privacy Policy | Term of Use
      </Typography>
    </Container>
  );
};

export default Footer;
