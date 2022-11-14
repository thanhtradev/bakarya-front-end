import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UploadIcon from "@mui/icons-material/Upload";

import { useState } from "react";
import { Button, MenuItem } from "@mui/material";

const ReportPost = () => {
  const [state, setState] = useState({
    FalseInformation: false,
    Spam: false,
    Nudity: false,
    SomethingElse: false,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleToggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const reportReasons = [
    { reason: "False Information" },
    { reason: "Spam" },
    { reason: "Nudity" },
    { reason: "Something else" },
  ];

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const reportPostReason = reportReasons.map((reason) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <FormControlLabel
        key={reason.reason}
        control={
          <Checkbox
            checked={state.reason}
            onChange={handleChange}
            name={reason.reason.replace(/\s/g, "")}
            value={reason.reason}
            key={reason.reason}
          />
        }
        label={reason.reason}
      />
    );
  });

  const handleSubmitReport = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const data = new FormData(e.currentTarget);
    const falseInfo = data.get("FalseInformation");
    const spam = data.get("Spam");
    const nudity = data.get("Nudity");
  };
  return (
    <MenuItem>
      <Button
        onClick={handleToggleDialog}
        sx={{ color: "black", fontSize: "13px" }}
      >
        Report
      </Button>
      <MUIDialog open={openDialog}>
        <form onSubmit={handleSubmitReport}>
          <DialogTitle textTransform="capitalize">
            Report recipe post
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingY: 0,
            }}
          >
            <FormControl>
              <FormLabel component="legend">Report reasons</FormLabel>
              <FormGroup>{reportPostReason}</FormGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggleDialog} type="submit">
              Agree
            </Button>
          </DialogActions>
        </form>
      </MUIDialog>
    </MenuItem>
  );
};

export default ReportPost;
