import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CurrentStep } from "./components";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PersonalDetails, OtherDetails, DocumentUploads } from "./components";
import { useFormDataHook } from "./useFormDataHook";

function Form() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const [currStep, setCurrStep] = useState(CurrentStep.personalDetails);
  const { formData, setFormData, formErrors, setFormErrors } =
    useFormDataHook();

  useEffect(() => {
    if (!stepId) navigate(`/form/${CurrentStep.personalDetails}`);
    else setCurrStep(stepId);
  }, [stepId]);

  return (
    <Card sx={{ backgroundColor: "inherit", boxShadow: "none" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: "20px", textAlign: "left", padding: "10px 20px" }}
        >
          {currStep === CurrentStep.personalDetails && <>Personal Details</>}
          {currStep === CurrentStep.otherDetails && <>Other Details</>}
          {currStep === CurrentStep.documentUploads && <>Upload Documents</>}
        </Typography>
        <Box
          sx={{
            boxShadow: "2px 3px 4px 1px #7e8287",
            padding: "20px 20px",
            minWidth: "50vw",
            backgroundColor: "#c9c6c6",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {currStep === CurrentStep.personalDetails && (
              <PersonalDetails
                formData={formData.personalDetails}
                formErrors={formErrors.personalDetails}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
              />
            )}
            {currStep === CurrentStep.otherDetails && (
              <OtherDetails
                formData={formData.otherDetails}
                formErrors={formErrors.otherDetails}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
              />
            )}
            {currStep === CurrentStep.documentUploads && (
              <DocumentUploads
                formData={formData.documents}
                formErrors={formErrors.documents}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
              />
            )}
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Form;
