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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const { src: Pic } = SigninPic;

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://bakarya.com/' component={NextLink}>
        Bakarya
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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

  const Clear = () => {
    resetUsername();
    resetPassword();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validForm = isFormValid();
    const data = new FormData(event.currentTarget);
    const email = data.get("username");
    const pwd = data.get("password");
    if (validForm) {
      SignIn(email, pwd);
    }

    // resetUsername();
    // resetPassword();
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const SignIn = async (email, pwd) => {
    try {
      handleToggle();
      const data = {
        username: email,
        password: pwd,
      };

      // const result = await handleFetchAxios();
      // handleToggle();
      Clear();

      // router.replace("/");
      let message = "Something went wrong";

      var config = {
        method: "post",
        url: "http://api.bakarya.com/api/auth/signin",
        headers: {},
        data: data,
      };

      axios(config)
        .then(function (response) {
          authCtx.login(response.data);
          console.log(response.data);
          router.replace("/");
        })
        .catch(function (error) {
          handleToggle();
          message = error.response.data.message;
          notifyError(message);
          Clear();
        });
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <React.Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>Bakarya - Login Page</title>
        <meta name='description' content='Join to share with others bakers' />
      </Head>
      <div>
        <Loading />
        <ToastContainer />
      </div>
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
            <Avatar sx={{ m: 1, bgcolor: "#3971b3" }}>
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

// export async function getServerSideProps(context) {}
