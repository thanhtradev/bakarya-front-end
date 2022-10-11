import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import SigninPic from "../../assets/signin3.jpg";
import { Stack } from "@mui/material";
import NextLink from "next/link";
import classes from "./../../styles/login-page.module.css";
import useValidInput from "../../hooks/use-valid-input";
import Head from "next/head";

const { src: Pic } = SigninPic;
const API_KEY = "AIzaSyBmAVs5sXUk8CSXLAYqNOkyr2ATRewsD44";

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://mui.com/' component={NextLink}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage() {
  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: hasErrorUser,
    inputChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUsername,
  } = useValidInput((value) => value.trim() !== "");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: hasErrorPassword,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useValidInput((value) => value.trim() !== "");

  const isFormValid = () => {
    return userNameIsValid && passwordIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validForm = isFormValid();
    if (validForm) {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: userNameValue,
            password: passwordValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((data) => {
              // console.log(data);
            });
          }
        })
        .then((data) => {
          authContext.login(data.idToken);
        })
        .catch((error) => alert(error));
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("username"),
        password: data.get("password"),
      });
    }

    resetUsername();
    resetPassword();
  };

  return (
    <React.Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>Bakarya - Login Page</title>
        <meta
          name='description'
          content='Create account to connect with bakers'
        />
      </Head>
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Pic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Username'
                name='username'
                autoComplete='email'
                autoFocus
                value={userNameValue}
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                helperText={`${
                  hasErrorUser ? "Fill in username" : "Ex: abc@gmail.com"
                }`}
                error={hasErrorUser}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                autoComplete='current-password'
                helperText={`${hasErrorPassword ? "Fill in password" : ""}`}
                error={hasErrorPassword}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Stack
                sx={{ width: "1" }}
                justifyContent='center'
                alignItems='center'
              >
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  className={
                    isFormValid() === false ? classes["btn-invalid"] : ""
                  }
                >
                  Sign In
                </Button>
              </Stack>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2' component={NextLink}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href='/signup-page'
                    variant='body2'
                    component={NextLink}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
