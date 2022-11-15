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
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useRef, useState } from "react";
import {
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  LoadingButton,
} from "@mui/material";
import AuthContext from "../../store/auth-context";
const reportReasons = [
  { reason: "False information" },
  { reason: "Spam" },
  { reason: "Hate speech" },
  { reason: "Harassment" },
  { reason: "Something else" },
];
import { ToastContainer, toast } from "react-toastify";

const ReportPost = ({ postId }) => {
  const [reason, setReason] = useState("");
  const authCtx = useContext(AuthContext);
  const isInvalid = reason.length === 0;
  const [openDialog, setOpenDialog] = useState(false);
  const otherReasonRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDialog = () => {
    setReason("");
    setOpenDialog((prev) => !prev);
  };
  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    const otherReasonText = otherReasonRef.current?.value;
    handleReport(reason, otherReasonText);
  };

  const radioButtonReasonList = reportReasons.map((reason) => {
    const name = reason.reason.replace(/\s/g, "");
    return (
      <FormControlLabel
        key={reason.reason}
        value={reason.reason}
        name={name}
        onChange={handleChange}
        control={<Radio />}
        label={reason.reason}
      />
    );
  });

  const handleReport = async (reason, otherReasonText) => {
    try {
      setIsLoading(true);
      const data = {
        type: reason,
        reason: otherReasonText ?? "",
        recipeid: postId,
      };

      var config = {
        method: "post",
        url: "http://api.bakarya.com/api/recipe/report",
        headers: {
          "x-access-token": authCtx.token,
        },
        data: data,
      };
      const res = await axios(config);

      notifyOk(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <>
      <MenuItem>
        <Button
          onClick={handleToggleDialog}
          sx={{ color: "black", fontSize: "13px" }}
        >
          Report
        </Button>
        <MUIDialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <ToastContainer />
          <form onSubmit={handleSubmitReport}>
            <DialogTitle textTransform='capitalize'>
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
                {/* <FormGroup>{reportPostReason}</FormGroup> */}
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='ReportReasons'
                >
                  {radioButtonReasonList}
                </RadioGroup>
                {reason === "Something else" && (
                  <TextField
                    variant='standard'
                    name='otherReasonText'
                    inputRef={otherReasonRef}
                  />
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Quit</Button>
              <Button type='submit' disabled={isInvalid}>
                Report
              </Button>
            </DialogActions>
          </form>
        </MUIDialog>
      </MenuItem>
    </>
  );
};

export default ReportPost;
