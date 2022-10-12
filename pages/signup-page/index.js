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
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpPage() {
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

  React.useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      const data = new FormData(event.currentTarget);
      SignUp({
        username: data.get("email"),
        pwd: data.get("password"),
      });

      // SignUp();
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
    var data = {
      email: username,
      password: pwd,
      returnSecureToken: true,
    };

    var data =
      '{\n    "username": "test2da",\n    "password": "!wetyqwqytw7676S",\n    "email": "thahsaas"\n}';

    var config = {
      method: "post",
      url: "http://api.bakarya.com/api/auth/signup",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSuccess = () => {
    setOpen(true);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
                  helperText='Example : John'
                  autoComplete='first-name'
                  enteredValue={firstNameValue}
                  hasError={hasErrorFirstName}
                  inputChangeHandler={firstNameChangeHandler}
                  inputBlurHandler={firstNameBlurHandler}
                  type='text'
                />
                <PasswordChecklist
                  rules={["minLength", "maxLength"]}
                  minLength={1}
                  maxLength={50}
                  value={firstNameValue}
                  messages={{
                    minLength: "Last name length > 0",
                    maxLength: "Last name length < 50",
                  }}
                  style={{ fontSize: "12px" }}
                  className={classes["center-checklist"]}
                  onChange={(isValid) => {}}
                  iconSize={10}
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
                  helperText='Example : Wick'
                  autoComplete='family-name'
                  enteredValue={lastNameValue}
                  hasError={hasErrorLastName}
                  inputChangeHandler={lastNameChangeHandler}
                  inputBlurHandler={lastNameBlurHandler}
                  type='text'
                />
                <PasswordChecklist
                  rules={["minLength", "maxLength"]}
                  minLength={1}
                  maxLength={50}
                  value={lastNameValue}
                  messages={{
                    minLength: "Last name length > 0",
                    maxLength: "Last name length < 50",
                  }}
                  className={classes["center-checklist"]}
                  style={{ fontSize: "12px" }}
                  onChange={(isValid) => {}}
                  iconSize={10}
                />
              </Grid>
              <Grid item xs={12}>
                <ValidateInput
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  enteredValue={emailValue}
                  inputChangeHandler={emailChangeHandler}
                  inputBlurHandler={emailBlurHandler}
                  errorMsg='Ex: JohnWick@abcxyz.com'
                  helperText='Ex: JohnWick@abcxyz.com'
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
                <Link to='/login-page' variant='body2' component={SignInLink}>
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
