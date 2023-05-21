import PersonalDetails from "./PersonalDetails";
import OtherDetails from "./OtherDetails";
import DocumentUploads from "./DocumentUploads";
import { Typography } from "@mui/material";

export const CurrentStep = {
  personalDetails: "personalDetails",
  otherDetails: "otherDetails",
  documentUploads: "documentUploads",
};

const formActions = {
  SET_FIRST_NAME: "SET_FIRST_NAME",
  SET_LAST_NAME: "SET_LAST_NAME",
  SET_PASSWORD: "SET_PASSWORD",
  SET_GENDER: "SET_GENDER",
  SET_JOINING: "SET_JOINING",
  SET_DOC: "SET_DOC"
};

const getError = (errors, text, ...keys) => {
  let isError = keys.reduce((accum = {}, curr) => {
    return accum[curr];
  }, errors);

  return isError ? (
    <Typography sx={{ color: "red", textAlign: "left", fontSize: "14px" }}>
      {text} is required
    </Typography>
  ) : null;
};

export const convertToBlob = (file) => {

}

export {
  PersonalDetails,
  OtherDetails,
  DocumentUploads,
  formActions,
  getError,
};
