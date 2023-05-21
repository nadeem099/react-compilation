import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { formActions, getError } from "./index";
import { CurrentStep } from "./index";

function OtherDetails({
  formData: { joining = [] },
  formErrors = {},
  setFormData,
  setFormErrors,
}) {
  const navigate = useNavigate();

  const checkForNextErrors = () => {
    let hasErrors;
    if (!joining || (joining && !joining.length)) {
      setFormErrors({ type: formActions.SET_JOINING, payload: true });
      hasErrors = true;
    }
    return hasErrors ? true : false;
  };

  const onNext = () => {
    const error = checkForNextErrors();
    if (!error) {
      navigate(`/form/${CurrentStep.documentUploads}`);
    }
  };

  const onPrevious = () => {
    navigate(`/form/${CurrentStep.personalDetails}`, "pop");
  };

  return (
    <>
      <FormControl>
        <FormLabel id="immediate-checkbox" sx={{ textAlign: "left" }}>
          How soon can you join?
        </FormLabel>
        <FormGroup
          aria-labelledby="immediate-checkbox"
          onChange={(e) => {
            setFormData({
              type: formActions.SET_JOINING,
              payload: e.target.value,
            });
            setFormErrors({ type: formActions.SET_JOINING, payload: false });
          }}
        >
          <FormControlLabel
            control={<Checkbox />}
            label="Within 60 days"
            value="60"
            checked={joining.includes("60")}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Within 30 days"
            value="30"
            checked={joining.includes("30")}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Immediate joiner"
            value="0"
            checked={joining.includes("0")}
          />
        </FormGroup>
        {getError(formErrors, "Above", "joining")}
      </FormControl>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Button variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </>
  );
}

export default OtherDetails;
