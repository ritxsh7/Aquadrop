import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";

const steps = ["Sign Up as seller", "Register your shop", "Add Products"];

export default function SellerSteps({ activeStep }) {
  return (
    <Box sx={{ width: "100%", maxWidth: "650px", margin: "1.25rem auto" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
