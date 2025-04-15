import { useState } from "react";
import { useVerifyLoginOtp } from "../../../query/verificationQuery";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { LoginResponse } from "../../../models/Requests";
import { ROUTES } from "../../../constants/routes";
import { useAuth } from "../../../context/Auth/AuthContext";
import { useRememberDevice } from "../../../query/loginQuery";
import { ParseJwt } from "../../../utils/jwt";
import { getDeviceFingerprint } from "../../../utils/generators";
import { useNavigate } from "react-router";

interface OTPVerificationProps {
  sessionId: string | undefined;
}

const OTPVerification = ({ sessionId }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");



  const navigate = useNavigate();
  const authContext = useAuth();
  const { mutate: verifyOtpMutate, isError, isPending } = useVerifyLoginOtp();
  const { mutate: rememberDeviceMutate } = useRememberDevice();

  const handleVerifyOTP = () => {
    const deviceFingerprint = getDeviceFingerprint();
    if (!sessionId) {
      setErrorMsg("Session ID is missing");
      return;
    }
    verifyOtpMutate(
      { sessionId, otp },
      {
        onSuccess: (data: LoginResponse) => {
          authContext.setTokens(
            data.tokens?.access_token || "",
            data.tokens?.refresh_token || ""
          );
          const email = ParseJwt(data.tokens?.access_token || "").email;
          
          if (!email || email === "") {
            navigate(ROUTES.LOGIN)
          } else {
            rememberDeviceMutate(
              {
                email,
                body: { deviceFingerprint: deviceFingerprint },
              },
              {
                onSuccess: () => {
                  localStorage.setItem("X-Device-Id", deviceFingerprint);
                  navigate(ROUTES.PANEL)
                },
                onError: () => {
                  navigate(ROUTES.PANEL)
                },
              }
            );
          }
        },
        onError: (err: Error) => {
          setErrorMsg(err.message);
        },
      }
    );
  };

  return (
    <>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}
      <Typography sx={{ mb: 2 }}>
        We sent to your e-mail verification code. Please put it below.
      </Typography>
      <Box>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Your verification code"
          value={otp}
          sx={{ mb: 2 }}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleVerifyOTP}
          fullWidth
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </Box>
    </>
  );
};

export default OTPVerification;
