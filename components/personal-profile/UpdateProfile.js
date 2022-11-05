import React from "react";
import { useRef } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const UpdateProfile = ({ firstname, lastname, birthday }) => {
  const [open, setOpen] = React.useState(false);
  const fistnameRef = useRef();
  const lastnameRef = useRef();
  const birthdayRef = useRef();
  const [firstnameValue, setFirstnameValue] = useState(firstname);
  const [lastnameValue, setLastnameValue] = useState(lastname);
  const [birthdayValue, setBirthdayValue] = useState(
    new Date(birthday).toISOString().split("T")[0]
  );
  const authCtx = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    const birthday = data.get("birthday");
    const lastname = data.get("firstname");
    const firstname = data.get("lastname");
    console.log(data.get("birthday"));
    updateUser(birthday, lastname, firstname);
  };

  const updateUser = async (birthday, lastname, firstname) => {
    try {
      const data = {
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
      };

      var config = {
        method: "post",
        url: "http://api.bakarya.com/api/user/update",
        headers: {
          "x-access-token": authCtx.token,
        },
        data: data,
      };

      const update = await axios(config);
      console.log(update);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeFirstname = () => {
    setFirstnameValue(fistnameRef.current.value);
  };
  const handleChangeLastname = () => {
    setLastnameValue(lastnameRef.current.value);
  };
  const handleChangeBirthday = () => {
    setBirthdayValue(birthdayRef.current.value);
  };
  return (
    <Grid item xs={4}>
      <Button
        onClick={handleClickOpen}
        sx={{
          height: "50px",
        }}
      >
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth={true}>
        <form onSubmit={handleUpdateUser} style={{ height: "fit-content" }}>
          <DialogTitle>Personal Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>Change Personal Profile</DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='firstname'
              label='First name'
              name='firstname'
              value={firstnameValue}
              inputRef={fistnameRef}
              onChange={handleChangeFirstname}
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              autoFocus
              margin='dense'
              id='lastname'
              label='Last name'
              name='lastname'
              value={lastnameValue}
              inputRef={lastnameRef}
              onChange={handleChangeLastname}
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              autoFocus
              margin='dense'
              value={birthdayValue}
              onChange={handleChangeBirthday}
              inputRef={birthdayRef}
              id='birthday'
              label='Birthday'
              name='birthday'
              type='date'
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={handleClose}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default UpdateProfile;
