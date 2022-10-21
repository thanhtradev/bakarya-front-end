import { TextField } from "@mui/material";
import React from "react";

export default function ValidateInput(props) {
  return (
    <TextField
      margin='normal'
      required={props.required ?? true}
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus ?? false}
      value={props.enteredValue}
      onChange={props.inputChangeHandler}
      placeholder={props.placeholder}
      onBlur={props.inputBlurHandler}
      helperText={`${
        props.hasError ? props.errorMsg ?? "" : props.helperText ?? ""
      }`}
      multiline={props.multiline ?? false}
      error={props.hasError}
      type={props.type}
      variant={props.variant ?? "outlined"}
      sx={{ marginBottom: props.marginBottom ?? "" }}
    />
  );
}
