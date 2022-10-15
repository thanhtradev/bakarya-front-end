import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Head from "next/head";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as SignInLink } from "next/link";
import useValidInput from "../../hooks/use-valid-input";
import ValidateInput from "../../components/ValidateInput/ValidateInput";
import classes from "../../styles/signup-page.module.css";
import dynamic from "next/dynamic";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//? Server-side import Password checklist components
const PasswordChecklist = dynamic(() => import("react-password-checklist"), {
  ssr: false,
});
function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://bakarya.com/'>
        Bakarya
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpPage() {
  //? Backdrop's state
  const [open, setOpen] = React.useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: hasErrorEmail,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useValidInput(
    (value) =>
      value.trim().length < 50 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) //? email regex
  );

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: hasErrorFirstName,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useValidInput((value) => value.trim() !== "" && value.trim().length < 50);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: hasErrorLastName,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useValidInput(
    (value) => value.trim().length > 0 && value.trim().length < 50
  );

  const {
    value: pwdValue,
    isValid: pwdIsValid,
    hasError: hasErrorPwd,
    inputChangeHandler: pwdChangeHandler,
    inputBlurHandler: pwdBlurHandler,
    reset: resetPwd,
  } = useValidInput((value) =>
    //? password contains:
    //? 1 special char
    //? 1 uppercase letter
    //? 1 lower letter
    //? 1 number
    //? has length < 50 and > 8
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,50}$/.test(
      value.trim()
    )
  );

  const {
    value: confirmPwdValue,
    isValid: confirmPwdIsValid,
    hasError: hasErrorConfirmPwd,
    inputChangeHandler: confirmPwdChangeHandler,
    inputBlurHandler: confirmPwdBlurHandler,
    reset: resetConfirmPwd,
  } = useValidInput(
    (value) =>
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,50}$/.test(
        value.trim()
      ) && value.localeCompare(pwdValue) === 0
  );

  const Loading = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
    console.log(open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      const data = new FormData(event.currentTarget);
      SignUp({
        username: data.get("email"),
        pwd: data.get("password"),
      });
    } else {
      alert("non");
    }

    // resetEmail();
    // resetFirstName();
    // resetLastName();
    // resetPwd();
    // resetConfirmPwd();
  };

  const SignUp = ({ username, pwd }) => {
    handleToggle();

    const data = {
      username: username,
      password: pwd,
      email: username,
    };

    var config = {
      method: "post",
      url: "http://api.bakarya.com/api/auth/signup",
      headers: {},
      data: data,
    };

    let message = "Something went wrong";
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          message = response.data.message;
          notifyOk(message);
        }
      })
      .catch(function (error) {
        console.log(error);
        message = error.response.data.message;
        notifyError(message);
      });
    handleToggle();
  };

  const notifyOk = (message) => {
    return toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyError = (message) => {
    return toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const isFormValid =
    emailIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    pwdIsValid &&
    confirmPwdIsValid;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title> Bakarya - Sign up Page</title>
        <meta
          name='description'
          content='Create account to connect with bakers'
        />
      </Head>
      <div>
        <Loading />
        <ToastContainer />
      </div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#3971b3" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ValidateInput
                  id='first name'
                  label='First name'
                  name='firstname'
                  autoFocus={true}
                  validate={(value) => value.trim() !== ""}
                  autoComplete='first-name'
                  enteredValue={firstNameValue}
                  placeholder='Ex: John'
                  hasError={hasErrorFirstName}
                  inputChangeHandler={firstNameChangeHandler}
                  inputBlurHandler={firstNameBlurHandler}
                  type='text'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ValidateInput
                  id='lastName'
                  label='Last Name'
                  name='lastname'
                  validate={(value) =>
                    value.trim.length > 0 && value.trim.length < 50
                  }
                  autoComplete='family-name'
                  enteredValue={lastNameValue}
                  placeholder='Ex: Wick'
                  hasError={hasErrorLastName}
                  inputChangeHandler={lastNameChangeHandler}
                  inputBlurHandler={lastNameBlurHandler}
                  type='text'
                />
              </Grid>
              <Grid item xs={12}>
                <ValidateInput
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  placeholder='Ex: JohnWick@abcxyz.com'
                  enteredValue={emailValue}
                  inputChangeHandler={emailChangeHandler}
                  inputBlurHandler={emailBlurHandler}
                  errorMsg='Ex: JohnWick@abcxyz.com'
                  hasError={hasErrorEmail}
                  type='text'
                />
              </Grid>
              <Grid item xs={12}>
                <ValidateInput
                  id='password'
                  label='Password'
                  name='password'
                  autoComplete='current-password'
                  enteredValue={pwdValue}
                  inputChangeHandler={pwdChangeHandler}
                  inputBlurHandler={pwdBlurHandler}
                  helperText='Fill in password'
                  errorMsg=''
                  hasError={hasErrorPwd}
                  type='password'
                />
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "maxLength",
                    "specialChar",
                    "number",
                    "capital",
                  ]}
                  style={{ fontSize: "12px" }}
                  iconSize={10}
                  value={pwdValue}
                  className={classes["center-checklist"]}
                  minLength={8}
                  maxLength={50}
                  onChange={(isValid) => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <ValidateInput
                  id='confirm-password'
                  label='Confirm Password'
                  name='confirm-password'
                  autoComplete='confirm-password'
                  enteredValue={confirmPwdValue}
                  inputChangeHandler={confirmPwdChangeHandler}
                  inputBlurHandler={confirmPwdBlurHandler}
                  helperText=''
                  errorMsg='Fill in confirm password'
                  hasError={hasErrorConfirmPwd}
                  type='password'
                />
                <PasswordChecklist
                  rules={["match"]}
                  className={classes["center-checklist"]}
                  style={{ fontSize: "12px" }}
                  value={pwdValue}
                  valueAgain={confirmPwdValue}
                  onChange={(isValid) => {}}
                  iconSize={10}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={isFormValid === true ? "" : classes["invalid"]}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login-page' variant='body2' component={SignInLink}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
