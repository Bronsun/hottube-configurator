import { JSX, useState } from "react";
import { Box } from "@mui/material";
import { NavigationConfig } from "../../common/NavigationButtons/NavigationButtons";
import { ROUTES } from "../../../constants/routes";
import SegmentedStepper from "../../common/SegmentedStepper/SegmentedStepper";
import NavigationButtons from "../../common/NavigationButtons/NavigationButtons";
import { useNavigate } from "react-router";

export interface Step {
  label: string;
  render: (setNavConfig: (config: NavigationConfig) => void) => JSX.Element;
}
interface OnboardingStepperProps {
  stepsConfig?: Step[];
  title: string;
}

const OnboardingStepper = ({
  stepsConfig = [],
  title,
}: OnboardingStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [navConfig, setNavConfig] = useState<NavigationConfig>({
    nextLabel: "Next",
    hideBack: activeStep === 0,
  });

  const navigate = useNavigate()

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, stepsConfig.length - 1));

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
    if (activeStep === 0) {
      navigate(ROUTES.LOGIN)
      return;
    }
  };

  const handleSkip = () =>
    setActiveStep((prev) => Math.min(prev + 1, stepsConfig.length - 1));

  return (
    <>
      <SegmentedStepper
        steps={stepsConfig.map((step) => step.label)}
        title={title}
        activeStep={activeStep}
        subtitle={stepsConfig[activeStep].label}
        onBack={handleBack}
      />

      <Box sx={{ mb: 2, mt: 2, p: 2 }}>
        {stepsConfig[activeStep].render(setNavConfig)}
      </Box>

      <Box>
        <NavigationButtons
          onBack={handleBack}
          onSkip={handleSkip}
          onNext={handleNext}
          config={navConfig}
        />
      </Box>
    </>
  );
};

export default OnboardingStepper;
