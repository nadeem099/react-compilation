import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  IconButton,
  Typography,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CurrentStep, formActions, getError } from "./index";

function DocumentUploads({
  formData: { resume } = {},
  formErrors,
  setFormData,
  setFormErrors,
}) {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [resumeUrl, setResumeUrl] = useState("");

  // useEffect(() => {
  //   if (resume && resumeRef.current) {
  //     resumeRef.current.href = URL.createObjectURL(resume);
  //     resumeRef.current.download = "Resume";
  //     setResumeUrl(resumeRef.current.href);
  //   }
  // }, [resume]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const existingFile = resume ? true : false;
    if (file) {
      setFormData({
        type: formActions.SET_DOC,
        payload: { docType: "resume", file: e.target.files[0] },
      });
      setFormErrors({
        type: formActions.SET_DOC,
        payload: { docType: "resume", error: false },
      });
    } else if (!file && !existingFile) {
      setFormErrors({
        type: formActions.SET_DOC,
        payload: { docType: "resume", error: true },
      });
    }
  };

  const checkForSubmitErrors = () => {
    let hasErrors;
    if (!resume) {
      setFormErrors({
        type: formActions.SET_DOC,
        payload: { docType: "resume", error: true },
      });
      hasErrors = true;
    }
    return hasErrors ? true : false;
  };

  const onSubmit = () => {
    const isError = checkForSubmitErrors();
    if (!isError) {
      console.log("Form is ready to submit");
    }
  };

  const onPrevious = () => {
    navigate(`/form/${CurrentStep.otherDetails}`, "pop");
  };

  const deleteDoc = (file) => {
    if (file) {
      setFormData({
        type: formActions.SET_DOC,
        payload: { docType: "resume", file: null },
      });
    }
  };

  const downloadDoc = () => {
    if (resumeRef.current) {
      resumeRef.current.click();
    }
  };

  return (
    <>
      <Input type="file" ref={resumeRef} onChange={handleFileUpload} />
      {getError(formErrors, "Resume", "resume")}
      {resume && resume.name && (
        <Box
          sx={{
            padding: "5px",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button aria-label="download doc" onClick={downloadDoc}>
            <a ref={resumeRef} target="_blank" hidden />
            <Typography>{resume.name}</Typography>
          </Button>
          <IconButton aria-label="delete doc" onClick={() => deleteDoc(resume)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      {/* {resumeRef.current && resumeRef.current.href && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="resume-preview"
            id="resume-preview"
          >
            Resume
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <iframe
                src={resumeUrl}
                width="100%"
                height="500px"
                title="Resume"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      )} */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
}

export default DocumentUploads;
  