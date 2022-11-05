import { Button, Typography } from "@mui/material";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";

export default function Dialog({ title, content, component }) {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen((prev) => !prev);
  };

  const keyDown = (e) => {
    if (e.key === "Escape") {
      handleToggleDialog();
    }
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(formData.get("FalseInformation"));
  };

  return (
    <React.Fragment>
      <Button
        component={component}
        onClick={handleToggleDialog}
        sx={{ color: "black", fontSize: "13px" }}
      >
        {title}
      </Button>
      <MUIDialog
        open={open}
        onKeyDown={keyDown}
        onSubmit={() => console.log("hi")}
      >
        <form onSubmit={handleSubmitReport}>
          <DialogTitle textTransform='capitalize'>{title}</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingY: 0,
            }}
          >
            {content}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggleDialog}>Disagree</Button>
          </DialogActions>
        </form>
      </MUIDialog>
    </React.Fragment>
  );
}
