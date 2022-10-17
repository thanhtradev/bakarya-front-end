import { Stack } from "@mui/material";
import classes from "./SideBar.module.css";

const SideBar = (props) => {
  return (
    <aside
      className={classes["sidenav"]}
      style={{
        position: props.position ?? "fixed",
        top: props.top ?? "77px",
        overflowY: props.overflowY ?? "unset",
        bottom: props.bottom ?? "0",
        right: props.right,
        left: props.left,
        paddingRight: `${props.position === "fixed" ? " 15px" : "none"}`,
        paddingLeft: `${props.position === "fixed" ? " 15px" : "none"}`,
        paddingTop: `${
          props.position === "fixed" && props.paddingTop
            ? "280px"
            : props.paddingTop
        }`,
      }}
    >
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={{
          // bgcolor: "violet",
          overscrollBehavior: "contain",
        }}
      >
        {props.children}
      </Stack>
    </aside>
  );
};

export default SideBar;
