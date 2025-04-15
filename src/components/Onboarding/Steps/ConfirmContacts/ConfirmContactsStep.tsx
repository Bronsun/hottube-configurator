import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EmailVerification from "../../Verification/EmailVerification";
import PhoneVerification from "../../Verification/PhoneVerification";
import PasswordVerification from "../../Verification/PasswordVerification";
import CheckboxList from "../../../common/CheckboxList/CheckboxList";
import { registerConsents } from "../../../../constants/consents";
import { NavigationConfig } from "../../../common/NavigationButtons/NavigationButtons";

interface ConfirmContactsStepProps {
  setNavConfig: (config: NavigationConfig) => void;
  onBoardingType: "register" | "social-login" | "legacy-login";
}

const ConfirmContactsStep = ({
  setNavConfig,
  onBoardingType,
}: ConfirmContactsStepProps) => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [onValidationChange, setOnValidationChange] = useState(false);

  // Determine if all required verifications are complete.
  const isVerified =
    onBoardingType === "social-login"
      ? passwordVerified && onValidationChange
      : emailVerified && passwordVerified && onValidationChange;

  // Update navigation configuration whenever verification status changes.
  useEffect(() => {
    setNavConfig({
      nextLabel: "Next",
      hideBack: true,
      hideSkip: true,
      disableNext: !isVerified,
    });
  }, [isVerified, setNavConfig]);

  // Render content based on the onboarding type.
  const renderContent = () => {
    switch (onBoardingType) {
      case "register":
        return (
          <>
            <Grid container spacing={2}>
              <EmailVerification onVerificationComplete={setEmailVerified} />
              <PhoneVerification />
            </Grid>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <Grid>
              <PasswordVerification
                onVerificationComplete={setPasswordVerified}
              />
            </Grid>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <CheckboxList
              items={registerConsents}
              onValidationChange={setOnValidationChange}
            />
          </>
        );
      case "social-login":
        return (
          <>
            <Grid container spacing={2}>
              <PhoneVerification />
            </Grid>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <Grid>
              <PasswordVerification
                onVerificationComplete={setPasswordVerified}
              />
            </Grid>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <CheckboxList
              items={registerConsents}
              onValidationChange={setOnValidationChange}
            />
          </>
        );
      case "legacy-login":
      default:
        return (
          <>
            <Grid container spacing={2}>
              <EmailVerification onVerificationComplete={setEmailVerified} />
              <PhoneVerification />
            </Grid>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <Grid>
              <PasswordVerification
                onVerificationComplete={setPasswordVerified}
              />
            </Grid>
          </>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default ConfirmContactsStep;
