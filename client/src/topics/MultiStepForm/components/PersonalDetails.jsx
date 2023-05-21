import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { formActions, getError } from "./index";
import { CurrentStep } from "./index";

function PersonalDetails({
  formData: { name = {}, password, gender },
  formErrors = {},
  setFormData,
  setFormErrors,
}) {
  const navigate = useNavigate("/");

  const handleOnChange = (e, actionType) => {
    const { value } = e.target;
    setFormData({ type: actionType, payload: value });
  };

  const handleOnBlur = (e, actionType) => {
    const { value } = e.target;
    const isError = !value ? true : false;
    setFormErrors({ type: actionType, payload: isError });
  };

  const checkForNextErrors = () => {
    let hasErrors;
    if (!name?.firstName) {
      setFormErrors({ type: formActions.SET_FIRST_NAME, payload: true });
      hasErrors = true;
    }
    if (!name?.lastName) {
      setFormErrors({ type: formActions.SET_LAST_NAME, payload: true });
      hasErrors = true;
    }
    if (!password) {
      setFormErrors({ type: formActions.SET_PASSWORD, payload: true });
      hasErrors = true;
    }
    if (!gender) {
      setFormErrors({ type: formActions.SET_GENDER, payload: true });
      hasErrors = true;
    }
    return hasErrors ? true : false;
  };

  const onNext = () => {
    const error = checkForNextErrors();
    if (!error) {
      navigate(`/form/${CurrentStep.otherDetails}`);
    }
  };

  return (
    <>
      <FormControl>
        <TextField
          id="firstName"
          label="FirstName"
          type="text"
          variant="standard"
          value={name.firstName || ""}
          onChange={(e) => handleOnChange(e, formActions.SET_FIRST_NAME)}
          onBlur={(e) => handleOnBlur(e, formActions.SET_FIRST_NAME)}
        />
        {getError(formErrors, "FirstName", "name", "firstName")}
      </FormControl>
      <FormControl>
        <TextField
          id="lastName"
          label="LastName"
          type="text"
          variant="standard"
          value={name.lastName || ""}
          onChange={(e) => handleOnChange(e, formActions.SET_LAST_NAME)}
          onBlur={(e) => handleOnBlur(e, formActions.SET_LAST_NAME)}
        />
        {getError(formErrors, "LastName", "name", "lastName")}
      </FormControl>
      <FormControl>
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="standard"
          value={password || ""}
          onChange={(e) => handleOnChange(e, formActions.SET_PASSWORD)}
          onBlur={(e) => handleOnBlur(e, formActions.SET_PASSWORD)}
        />
        {getError(formErrors, "Password", "password")}
      </FormControl>
      <FormControl>
        <FormLabel id="gender-radio-buttons" sx={{ textAlign: "left" }}>
          Gender
        </FormLabel>
        <RadioGroup
          aria-labelledby="gender-radio-button"
          onChange={(e) => {
            handleOnChange(e, formActions.SET_GENDER);
            setFormErrors({ type: formActions.SET_GENDER, payload: false });
          }}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
            checked={gender === "female"}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            checked={gender === "male"}
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Other"
            checked={gender === "other"}
          />
        </RadioGroup>
        {getError(formErrors, "Gender", "gender")}
      </FormControl>
      <Button variant="contained" onClick={onNext}>
        Next
      </Button>
    </>
  );
}

export default PersonalDetails;
