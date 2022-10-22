import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/material";
import TextBox from "../../ui/RichTextBox";
import axios from "axios";
import useValidInput from "../../../hooks/use-valid-input";
import ValidateInput from "../../ValidateInput/ValidateInput";
import AuthContext from "../../../store/auth-context";
import CircularProgress from "@mui/material/CircularProgress";

const Asterisk = () => {
  return <span sx={{ color: "red" }}>*</span>;
};

export default function FormDialog(props) {
  const authCtx = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [ingrdData, setIngrdData] = React.useState([]);
  const [directionData, setDirectionData] = React.useState([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [logined, setLogined] = React.useState(false);

  const {
    value: cakeNameValue,
    isValid: cakeNameIsValid,
    hasError: hasErrorCakeName,
    inputChangeHandler: cakeNameChangeHandler,
    inputBlurHandler: cakeNameBlurHandler,
    reset: resetCakeName,
  } = useValidInput(
    (value) => value.trim().length > 0 && value.trim().length < 50
  );

  const {
    value: cakeBriefValue,
    isValid: cakeBriefIsValid,
    hasError: hasErrorCakeBrief,
    inputChangeHandler: cakeBriefChangeHandler,
    inputBlurHandler: cakeBriefBlurHandler,
    reset: resetcakeBrief,
  } = useValidInput((value) => value.trim().length > 0);

  const {
    value: prepValue,
    isValid: prepIsValid,
    hasError: hasErrorPrep,
    inputChangeHandler: prepChangeHandler,
    inputBlurHandler: prepBlurHandler,
    reset: resetPrep,
  } = useValidInput((value) => value.trim().length < 30);

  const {
    value: serveValue,
    isValid: serveIsValid,
    hasError: hasErrorServe,
    inputChangeHandler: serveChangeHandler,
    inputBlurHandler: serveBlurHandler,
    reset: resetServe,
  } = useValidInput((value) => value < 200000);

  const {
    value: nutritionValue,
    isValid: nutritionIsValid,
    hasError: hasErrorNutrition,
    inputChangeHandler: nutritionChangeHandler,
    inputBlurHandler: nutritionBlurHandler,
    reset: resetNutrition,
  } = useValidInput((value) => value.trim().length < 300);

  React.useEffect(() => {
    setLogined(authCtx.isLoggedIn);
  }, []);

  const handleToggle = () => {
    setIsLoading((prev) => !prev);
  };

  const token = authCtx.token;

  const getIngrdData = React.useCallback((data) => {
    setIngrdData(data);
  }, []);

  const getDirectionData = (data) => {
    setDirectionData(data);
  };

  const handleQuit = () => {
    //* confirm to quit
    setFormOpen(false);
    //* handle close form
    setOpenConfirm(false);
    resetCakeName();
    resetcakeBrief();
    resetPrep();
    resetServe();
    resetNutrition();
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

  const handleCreate = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    CreatePost({
      cakeName: data.get("cakename"),
      cakeBrief: data.get("cakebrief"),
      ingrdData,
      directionData,
      nutrition: data.get("nutrition"),
      prepTime: data.get("prep"),
      serving: data.get("serving"),
    });
  };

  const CreatePost = ({
    cakeName,
    cakeBrief,
    ingrdData,
    directionData,
    nutrition,
    prepTime,
    serving,
  }) => {
    //** toggle loading on*/
    handleToggle();
    var data = {
      author: authCtx.username,
      createdAt: new Date(),
      name: cakeName,
      expert: cakeBrief,
      time: prepTime,
      makes: serving,
      ingredients: ingrdData,
      directions: directionData,
      nutrition: nutrition,
      categories: "Angel Food Cakes",
    };

    var config = {
      method: "post",
      url: "http://api.bakarya.com/api/recipe",
      headers: {
        "x-access-token": token,
      },
      data: data,
    };

    console.log(ingrdData);

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setFormOpen(false);
          resetCakeName();
          resetcakeBrief();
          resetPrep();
          resetServe();
          resetNutrition();
        }
        //** toggle loading off */
        handleToggle();

        props.handleCreatedPost(data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <form onSubmit={handleCreate}>
          <DialogContent>
            <DialogTitle sx={{ margin: 0, padding: 0 }}>New Recipe</DialogTitle>
            <ValidateInput
              id='first name'
              label='Cake name'
              required={true}
              name='cakename'
              validate={(value) => value.trim() !== ""}
              autoComplete='first-name'
              enteredValue={cakeNameValue}
              placeholder='Ex: Angle Food Cake'
              hasError={hasErrorCakeName}
              inputChangeHandler={cakeNameChangeHandler}
              inputBlurHandler={cakeNameBlurHandler}
              variant='standard'
              type='text'
            />
            <ValidateInput
              id='cake brief'
              label="Cake's brief"
              required={true}
              name='cakebrief'
              validate={(value) => value.trim() !== ""}
              autoComplete='cake-brief'
              enteredValue={cakeBriefValue}
              placeholder='Ex: John'
              hasError={hasErrorCakeBrief}
              inputChangeHandler={cakeBriefChangeHandler}
              inputBlurHandler={cakeBriefBlurHandler}
              variant='standard'
              type='text'
            />
            <DialogContentText
              sx={{
                "&.MuiDialogContentText-root": {
                  color: "#9d9d9d",
                  fontWeight: "lighter",
                },
              }}
            >
              Ingredients
              <Asterisk />
            </DialogContentText>
            <TextBox type='unordered-list-item' getData={getIngrdData} />
            <DialogContentText
              sx={{
                "&.MuiDialogContentText-root": {
                  color: "#9d9d9d",
                },
              }}
            >
              Direction
              <Asterisk />
            </DialogContentText>
            <TextBox type='ordered-list-item' getData={getDirectionData} />
            <ValidateInput
              id='nutrition'
              label="Recipe's nutrition"
              name='nutrition'
              validate={(value) => value.trim().length < 40}
              autoComplete='cake-brief'
              enteredValue={nutritionValue}
              placeholder='Ex: 4.5mg Fat'
              hasError={hasErrorNutrition}
              inputChangeHandler={nutritionChangeHandler}
              inputBlurHandler={nutritionBlurHandler}
              variant='standard'
              type='text'
            />
            <ValidateInput
              id='pre-time'
              label='Preparation time'
              name='prep'
              validate={(value) => value.trim().length < 40}
              autoComplete='cake-brief'
              enteredValue={prepValue}
              placeholder='Ex: 30min. Bake 10min + chilling'
              hasError={hasErrorPrep}
              value={prepValue}
              inputChangeHandler={prepChangeHandler}
              inputBlurHandler={prepBlurHandler}
              variant='standard'
              type='text'
            />
            <ValidateInput
              id='serving'
              label='Number of serving'
              name='serving'
              validate={(value) => value < 20000}
              autoComplete='cake-brief'
              enteredValue={serveValue}
              placeholder='Ex: 10 serving'
              hasError={hasErrorServe}
              inputChangeHandler={serveChangeHandler}
              inputBlurHandler={serveBlurHandler}
              variant='standard'
              type='number'
            />
            <DialogActions>
              <Button onClick={handleFormClose}>Cancel</Button>
              <Button type='submit'>Post</Button>
            </DialogActions>
          </DialogContent>
        </form>
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
