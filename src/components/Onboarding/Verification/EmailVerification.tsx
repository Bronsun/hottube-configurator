import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid2";
import {
  useInitiateEmailVerification,
  useVerifyEmailOtp,
} from "../../../query/verificationQuery";
import { useOnboardingContext } from "../../../context/OnboardingContext";

interface EmailVerificationProps {
  onVerificationComplete?: (completed: boolean) => void;
}

const EmailVerification = ({
  onVerificationComplete,
}: EmailVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const onboardingContext = useOnboardingContext();
  
  const {
    mutate: initiateEmail,
    isPending: initiateLoading,
    error: initiateError,
  } = useInitiateEmailVerification();

  const {
    mutate: verifyEmailOtp,
    isPending: isVerifyLoading,
    error: verifyError,
  } = useVerifyEmailOtp();

  

  //TIMER FOR SEND BUTTON
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [counter]);

  // SETUP VERIFICATION BUTTON
  useEffect(() => {
    if (onVerificationComplete) {
      onVerificationComplete(isVerified);
    }
  }, [onVerificationComplete, isVerified]);


  // QUERY FOR SENDING EMAIL
  const onSendEmail = () => {
    if (!email) return;
    initiateEmail(
      { email },
      {
        onSuccess: (data) => {
          setVerificationId(data.verificationId);
          setCounter(1000);
        },
      }
    );
  };

  // QUERY FOR VERIFYING EMAIL
  const onVerifyOtp = () => {
    if (!verificationId) {
      return;
    }
    verifyEmailOtp(
      { verificationId, otp },
      {
        onSuccess: (data) => {
          setIsVerified(true);
          onboardingContext.updateData({
            email: email,
            emailVerificationToken: data.verificationToken,
          });
        },

      }
    );
  };

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box mb={1}>
          <Typography variant="subtitle2">Email address *</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            required
            aria-label="Email address"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isVerified}
          />
          <Button
            variant="contained"
            aria-label="Send email verification code"
            onClick={onSendEmail}
            color={counter > 0 ? "success" : "primary"}
            endIcon={counter > 0 ? <CheckIcon /> : <SendIcon />}
            sx={{
              borderRadius: "0px 8px 8px 0px",
              height: "48px",
              transform: "translateX(-10px)",
              ":disabled": {
                backgroundColor: "primary.light",
                height: "48px",
                color: "white",
              },
            }}
            disabled={
              email.trim() === "" ||
              counter > 0 ||
              initiateLoading ||
              isVerified
            }
          >
            {counter > 0 ? `Sent` : "Send"}
          </Button>
        </Box>
        {initiateError && (
          <Typography color="error">
            {(initiateError as Error).message}
          </Typography>
        )}
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box mb={1}>
          <Typography variant="subtitle2">Email verification code*</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="Enter OTP"
            variant="outlined"
            fullWidth
            required
            aria-label="Email verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isVerified}
          />
          <Button
            variant="contained"
            aria-label="Verify email verification code"
            onClick={onVerifyOtp}
            sx={{
              borderRadius: "0px 8px 8px 0px",
              height: "48px",
              transform: "translateX(-10px)",
              ":disabled": {
                backgroundColor: "primary.light",
                height: "48px",
                color: "white",
              },
            }}
            disabled={otp.trim() === "" || isVerifyLoading}
            loading={isVerifyLoading}
            color={isVerified ? "success" : "primary"}
            endIcon={isVerified ? <CheckIcon /> : null}
          >
            {isVerified ? "Verified" : "Verify"}
          </Button>
        </Box>
        {verifyError && (
          <Typography color="error">
            {(verifyError as Error).message}
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default EmailVerification;
