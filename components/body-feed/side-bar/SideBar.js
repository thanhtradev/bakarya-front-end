import { Stack } from "@mui/material";
import classes from "./SideBar.module.css";

const SideBar = (props) => {
  return (
    <aside
      className={classes["sidenav"]}
      style={{
        position: props.position ?? "fixed",
        right: props.right,
        left: props.left,
      }}
    >
      <Stack direction='column' justifyContent='center' alignItems='center'>
        {props.children}
      </Stack>
    </aside>
  );
};

export default SideBar;
