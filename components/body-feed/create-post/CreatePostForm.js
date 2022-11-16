import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, Typography } from "@mui/material";
import TextBox from "../../ui/RichTextBox";
import axios from "axios";
import useValidInput from "../../../hooks/use-valid-input";
import ValidateInput from "../../ValidateInput/ValidateInput";
import AuthContext from "../../../store/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "../../ui/RGBLed.module.css";
import UploadIcon from "@mui/icons-material/Upload";
import PostImages from "../../recipe-post/PostImages";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Asterisk = () => {
  return <span sx={{ color: "red" }}>*</span>;
};

const IMAGE_LIMIT = 4;

export default function FormDialog(props) {
  const recipeImages = React.useRef();
  const authCtx = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [ingrdData, setIngrdData] = React.useState([]);
  const [directionData, setDirectionData] = React.useState([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [isUploadLoading, setIsUploadLoading] = React.useState(false);
  const [logined, setLogined] = React.useState(false);
  const [previewImages, setPreviewImages] = React.useState([]);
  const [uploadImages, setUploadImages] = useState([]);
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

  const onChangeRecipeImages = () => {
    const images = recipeImages.current.files;
    const isOkImagesListLength = checkUploadImagesLength(images);
    if (!isOkImagesListLength)
      throw new Error("Cannot upload more than 3 images");

    const convertArr = Array.from(images);
    const preview = [];
    const upload = [];
    convertArr.map((img, i) => {
      preview.push(URL.createObjectURL(img));
      upload.push(img);
    });
    setUploadImages((prev) => {
      console.log(uploadImages.concat(upload));
      return uploadImages.concat(upload);
    });
    setPreviewImages((prev) => {
      return previewImages.concat(preview);
    });
  };

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
    setPreviewImages([]);
    setUploadImages([]);
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
    const form = new FormData(e.currentTarget);
    const data = {
      cakeName: form.get("cakename"),
      cakeBrief: form.get("cakebrief"),
      ingrdData,
      directionData,
      nutrition: form.get("nutrition"),
      prepTime: form.get("prep"),
      serving: form.get("serving"),
    };

    const toUploadImages = Array.from(uploadImages);
    // CreatePostWithoutImages(data);
    CreatePostWithImages(data, toUploadImages);
  };

  // const CreatePostWithoutImages = ({
  //   cakeName,
  //   cakeBrief,
  //   ingrdData,
  //   directionData,
  //   nutrition,
  //   prepTime,
  //   serving,
  // }) => {
  //   //** toggle loading on*/
  //   handleToggle();
  //   var data = {
  //     recipe: {
  //       author: authCtx.username,
  //       createdAt: new Date(),
  //       name: cakeName,
  //       expert: cakeBrief,
  //       time: prepTime,
  //       makes: serving,
  //       ingredients: ingrdData,
  //       directions: directionData,
  //       nutrition: nutrition,
  //       categories: "Angel Food Cakes",
  //     },
  //     images: [],
  //   };

  //   setIsUploadLoading(true);
  //   var config = {
  //     method: "post",
  //     url: "http://api.bakarya.com/api/recipe",
  //     headers: {
  //       "x-access-token": token,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log("i ran");
  //       if (response.status === 200) {
  //         setFormOpen(false);
  //         resetCakeName();
  //         resetcakeBrief();
  //         resetPrep();
  //         resetServe();
  //         resetNutrition();
  //       }
  //       //** toggle loading off */
  //       handleToggle();

  //       // props.handleCreatedPost(data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   setIsUploadLoading(false);
  // };

  const CreatePostWithImages = async (
    {
      cakeName,
      cakeBrief,
      ingrdData,
      directionData,
      nutrition,
      prepTime,
      serving,
    },
    toUploadImages
  ) => {
    try {
      setIsUploadLoading(true);

      const data = {
        recipe: {
          createdAt: new Date(),
          name: cakeName,
          expert: cakeBrief,
          time: prepTime,
          makes: serving,
          ingredients: ingrdData,
          directions: directionData,
          nutrition: nutrition,
          categories: "Angel Food Cakes",
        },
        images: toUploadImages,
      };
      console.log(toUploadImages);
      const formData = new FormData();
      formData.append("recipe", JSON.stringify(data.recipe));
      toUploadImages.map((img) => {
        formData.append("images", img);
      });

      // console.log(formData.toString());

      var config = {
        method: "post",
        url: "http://api.bakarya.com/api/recipe",
        headers: {
          "x-access-token": authCtx.token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      const res = await axios(config);
      console.log(res.data);
      notifyOk(res.data.message);
      setTimeout(() => {
        handleQuit();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
    setIsUploadLoading(false);
  };

  const notifyOk = (message) =>
    toast.success(message, {
      position: "top-left",
      autoClose: 3500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const checkUploadImagesLength = (toCheckList) =>
    toCheckList.length <= IMAGE_LIMIT;

  const checkIsUploadImages = (toCheckList) => toCheckList.length > 0;

  const handleUploadRecipeImages = () => {
    recipeImages.current.click();
  };

  return (
    <React.Fragment>
      <Button
        disableRipple
        variant="text"
        className={classes["to-RGB"]}
        onClick={handleFormClickOpen}
        sx={{
          width: "0.95",
          height: "0.5",
          bgcolor: "#f0f2f5",
          color: "#65676b",
          borderRadius: "30px",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "20px",
        }}
      >
        <Typography variant="button">want to share your recipe ?</Typography>
      </Button>
      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <ToastContainer />
        <form onSubmit={handleCreate}>
          <DialogContent>
            <DialogTitle sx={{ margin: 0, padding: 0 }}>New Recipe</DialogTitle>
            <ValidateInput
              id="first name"
              label="Cake name"
              required={true}
              name="cakename"
              validate={(value) => value.trim() !== ""}
              autoComplete="first-name"
              enteredValue={cakeNameValue}
              placeholder="Ex: Angle Food Cake"
              hasError={hasErrorCakeName}
              inputChangeHandler={cakeNameChangeHandler}
              inputBlurHandler={cakeNameBlurHandler}
              variant="outlined"
              type="text"
            />
            <ValidateInput
              id="cake brief"
              label="Cake's brief"
              required={true}
              name="cakebrief"
              validate={(value) => value.trim() !== ""}
              autoComplete="cake-brief"
              enteredValue={cakeBriefValue}
              placeholder="Ex: John"
              hasError={hasErrorCakeBrief}
              inputChangeHandler={cakeBriefChangeHandler}
              inputBlurHandler={cakeBriefBlurHandler}
              variant="outlined"
              type="text"
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
            <TextBox type="unordered-list-item" getData={getIngrdData} />
            <DialogContentText
              sx={{
                "&.MuiDialogContentText-root": {
                  color: "#9d9d9d",
                },
              }}
            >
              Directions
              <Asterisk />
            </DialogContentText>
            <TextBox type="ordered-list-item" getData={getDirectionData} />
            <ValidateInput
              id="nutrition"
              label="Recipe's nutrition"
              name="nutrition"
              validate={(value) => value.trim().length < 40}
              autoComplete="cake-brief"
              enteredValue={nutritionValue}
              placeholder="Ex: 4.5mg Fat"
              hasError={hasErrorNutrition}
              inputChangeHandler={nutritionChangeHandler}
              inputBlurHandler={nutritionBlurHandler}
              variant="outlined"
              type="text"
            />
            <ValidateInput
              id="pre-time"
              label="Preparation time"
              name="prep"
              validate={(value) => value.trim().length < 40}
              autoComplete="cake-brief"
              enteredValue={prepValue}
              placeholder="Ex: 30min. Bake 10min + chilling"
              hasError={hasErrorPrep}
              value={prepValue}
              inputChangeHandler={prepChangeHandler}
              inputBlurHandler={prepBlurHandler}
              variant="outlined"
              type="text"
            />
            <ValidateInput
              id="serving"
              label="Number of serving"
              name="serving"
              validate={(value) => value < 20000}
              autoComplete="cake-brief"
              enteredValue={serveValue}
              placeholder="Ex: 10 serving"
              hasError={hasErrorServe}
              inputChangeHandler={serveChangeHandler}
              inputBlurHandler={serveBlurHandler}
              variant="outlined"
              type="number"
            />
            <Button
              onClick={handleUploadRecipeImages}
              startIcon={<UploadIcon sx={{ fontSize: "17px" }} />}
            >
              Upload photo(s)
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={recipeImages}
              name="recipeImages"
              multiple
              style={{ display: "none" }}
              onChange={onChangeRecipeImages}
            />
            {/* {console.log(previewImages)} */}
            <PostImages images={previewImages} />
            <DialogActions>
              <Button onClick={handleFormClose}>Cancel</Button>
              {isUploadLoading ? (
                <LoadingButton
                  loading
                  variant="outlined"
                  sx={{ height: "30px" }}
                />
              ) : (
                <Button type="submit">Post</Button>
              )}
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
