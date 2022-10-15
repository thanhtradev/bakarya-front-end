import { Box } from "@mui/material";
import classes from "./Header.module.css";
import logo from "../../assets/logo.png";

const { src: logoSrc } = logo;

function Header() {
  return (
    <div style={{ height: "50px", marginBottom: "10px" }}>
      <header className={classes.header}>
        <Box
          component='img'
          alt='Logo'
          src={`${logoSrc}`}
          sx={{ height: 1, width: "50px", zIndex: 100 }}
        />
      </header>
    </div>
  );
}

export default Header;
