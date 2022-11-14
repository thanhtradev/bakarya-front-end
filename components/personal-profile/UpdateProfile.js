import React, { useEffect } from "react";
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

const UpdateProfile = () => {
  const [open, setOpen] = React.useState(false);
  const fistnameRef = useRef();
  const lastnameRef = useRef();
  const birthdayRef = useRef();
  const [firstnameValue, setFirstnameValue] = useState();
  const [lastnameValue, setLastnameValue] = useState();
  const [birthdayValue, setBirthdayValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetchUserProfile();
    console.log(birthdayValue);
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "get",
        url: "http://api.bakarya.com/api/user/profile",
        headers: {
          "x-access-token": authCtx.token,
        },
      });

      const { birthday, email, firstname, lastname } = res.data;
      setFirstnameValue(firstname);
      setLastnameValue(lastname);

      const dateFromDB = new Date(birthday).toLocaleString("en-US", {
        timeZone: "Asia/Shanghai",
      });
      const timeZone = dateFromDB.split(",")[0];
      const displayDate = timeZone
        .slice(0, timeZone.length + 1)
        .split("/")
        .reverse()
        .join("-");
      console.log(
        new Date(birthday).toLocaleString("en-US", {
          timeZone: "Asia/Shanghai",
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const birthday = data.get("birthday");
    const lastname = data.get("firstname");
    const firstname = data.get("lastname");
    updateUser(birthday, lastname, firstname);
  };

  const updateUser = async (birthday, lastname, firstname) => {
    try {
      const data = {
        firstname: firstname,
        lastname: lastname,
        birthday: new Date(birthday).toLocaleString("en-US", {
          timeZone: "Asia/Bangkok",
        }),
      };

      console.log(
        new Date(birthday).toLocaleString("en-US", {
          timeZone: "Asia/Shanghai",
        })
      );
      console.log("---");
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
    <Grid item xs={3} display='flex' justifyContent='center'>
      <Button
        onClick={handleClickOpen}
        sx={{
          height: "50px",
        }}
      >
        Edit Profile
      </Button>
      {!isLoading && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth='xs'
          fullWidth={true}
        >
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
      )}
    </Grid>
  );
};

export default UpdateProfile;
