import { ChangeEvent, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { validatePassword } from "../../../utils/validate";
import { useOnboardingContext } from "../../../context/OnboardingContext";

interface PasswordVerificationProps {
  onVerificationComplete?: (isVerified: boolean) => void;
}

const PasswordVerification = ({
  onVerificationComplete,
}: PasswordVerificationProps) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onboardingContext = useOnboardingContext();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    if (confirmPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError(validationError);
    }
    if (onVerificationComplete) {
      onVerificationComplete(
        newPassword === confirmPassword && validationError === ""
      );
    }
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirm = event.target.value;
    setConfirmPassword(newConfirm);
    if (password !== newConfirm) {
      setError("Passwords do not match.");
    } else {
      const validationError = validatePassword(password);
      setError(validationError);
    }
    if (onVerificationComplete) {
      onVerificationComplete(
        password === newConfirm && validatePassword(password) === ""
      );
      onboardingContext.updateData({ password: password });
    }
  };

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="subtitle2">Password</Typography>
      </Box>
      <TextField
        fullWidth
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        error={Boolean(error)}
        helperText={
          error ||
          "Minimum 8 characters, must contain uppercase letter, number, and special character."
        }
        aria-label="Password"
        variant="outlined"
      />
      <Box mt={2} mb={1}>
        <Typography variant="subtitle2">Confirm Password</Typography>
      </Box>
      <TextField
        fullWidth
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={Boolean(error)}
        helperText={error}
        aria-label="Confirm Password"
        variant="outlined"
      />
    </Box>
  );
};

export default PasswordVerification;
