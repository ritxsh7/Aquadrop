import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";

const steps = ["Sign Up as seller", "Register your shop", "Add Products"];

export default function SellerSteps({ activeStep, style }) {
  return (
    <Box sx={{ width: "100%", maxWidth: "650px", margin: "1.25rem auto" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step
            key={label}
            sx={
              style && {
                "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
                  color: "whitesmoke",
                },
                "& .css-yu149z-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
                  {
                    color: "white",
                  },
                "& .css-yu149z-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
                  color: "yellow",
                },
                "& .css-yu149z-MuiSvgIcon-root-MuiStepIcon-root": {
                  color: "white",
                },
                "& .css-m47c3m-MuiStepIcon-text": {
                  fill: "#407BFF",
                },
              }
            }
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
