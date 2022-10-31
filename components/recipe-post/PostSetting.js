import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingButton from "../ui/Dialog";
import { Stack, Typography } from "@mui/material";
import ReportPost from "./Reportpost";

const ITEM_HEIGHT = 30;

function PostSetting(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleEditPost = () => {};
  const handleDeletePost = () => {};
  const handleReport = () => {};

  const options = [
    {
      title: "Edit Post",
      content: "",
      onClick: handleEditPost,
    },
    {
      title: "Delete Post",
      content: "Delete this post ?",
      onClick: handleDeletePost,
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            padding: "none",
          },
        }}
      >
        <Stack>
          {options.map((option) => (
            // <MenuItem key={option}>
            <SettingButton
              key={option.title}
              component={MenuItem}
              title={option.title}
              content={<Typography>{option.content}</Typography>}
              action={option.onClick}
            />
            // {/* </MenuItem> */}
          ))}
          <ReportPost />
        </Stack>
      </Menu>
    </React.Fragment>
  );
}

export default PostSetting;
