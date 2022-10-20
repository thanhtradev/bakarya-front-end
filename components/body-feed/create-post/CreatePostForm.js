import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/material";
import TextBox from "../../ui/RichTextBox";

const Asterisk = () => {
  return <span sx={{ color: "red" }}>*</span>;
};

const bullet = "\u2022 ";

export default function FormDialog(props) {
  const ingrdRef = React.useRef();
  const [formOpen, setFormOpen] = React.useState(true);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleQuit = () => {
    //* confirm to quit
    setFormOpen(false);
    //* handle close form
    setOpenConfirm(false);
  };
  const handleContinue = () => {
    //* do not quit
    setOpenConfirm(false);
  };
  const handleFormClose = () => {
    //* confirm quit
    setOpenConfirm(true);
  };

  const handleFormClickOpen = () => {
    setFormOpen(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  return (
    <React.Fragment>
      <Button
        disableRipple
        variant='text'
        onClick={handleFormClickOpen}
        sx={{ width: "1", height: "1" }}
      >
        Create new recipe
      </Button>
      <Dialog open={formOpen} onClose={handleFormClose} maxWidth='sm' fullWidth>
        <DialogContent>
          <DialogTitle sx={{ margin: 0, padding: 0 }}>New Recipe</DialogTitle>
          <DialogContentText
            sx={{
              "&.MuiDialogContentText-root": {
                color: "black",
              },
            }}
          >
            Cake's Name
            <Asterisk />
          </DialogContentText>
          <Input
            fullWidth
            placeholder="Example: Santa Clause's Flan"
            aria-label="Recipe's name"
            sx={{ marginBottom: "10px" }}
          />
          <DialogContentText
            sx={{
              "&.MuiDialogContentText-root": {
                color: "black",
              },
            }}
          >
            Cake's brief
            <Asterisk />
          </DialogContentText>
          <Input
            fullWidth
            multiline
            placeholder='A brief introduction for your recipe'
            aria-label="Recipe's brief"
            sx={{ marginBottom: "10px" }}
          />
          <DialogContentText
            sx={{
              "&.MuiDialogContentText-root": {
                color: "black",
              },
            }}
          >
            Ingredients
            <Asterisk />
          </DialogContentText>
          <TextBox type='unordered-list-item' />
          <DialogContentText
            sx={{
              "&.MuiDialogContentText-root": {
                color: "black",
              },
            }}
          >
            Direction
            <Asterisk />
          </DialogContentText>
          <TextBox type='ordered-list-item' />
          <DialogContentText>Nutrition (Optional)</DialogContentText>
          <Input
            fullWidth
            multiline
            placeholder='Show the nutrition in your recipe'
            aria-label="Recipe's nutrition"
            sx={{ marginBottom: "10px" }}
          />
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button onClick={handleFormClose}>Post</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirm} onClose={handleConfirmClose}>
        <DialogContent>
          <DialogTitle>Cancel your post</DialogTitle>
          <DialogContentText>
            All your contents will be reset. Are you sure to close ?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleContinue}>No, continue</Button>
            <Button onClick={handleQuit}>Yes, I am</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
