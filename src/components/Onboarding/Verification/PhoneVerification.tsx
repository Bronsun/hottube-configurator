import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid2";
import { countryCodes } from "../../../constants/countryCodes";
import {
  useInitiatePhoneVerification,
  useVerifyPhoneOtp,
} from "../../../query/verificationQuery";
import { useOnboardingContext } from "../../../context/OnboardingContext";

const PhoneVerification = () => {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [countryCode, setCountryCode] = useState("+39"); // ITALIAN BASED
  const [verificationId, setVerificationId] = useState<string | null>(null);
  
  const onboardingContex = useOnboardingContext()

  const {
    mutate: initiatePhone,
    isPending: isInitiateLoading,
    error: initiateError,
  } = useInitiatePhoneVerification();

  const {
    mutate: verifyPhoneOtp,
    isPending: isVerifyLoading,
    error: verifyError,
  } = useVerifyPhoneOtp();

  // TIMER FOR SENDING PHONE NUMEBR
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

  const onSendPhone = () => {
    const fullPhoneNumber = countryCode + phoneNumber;
    initiatePhone(
      { phoneNumber: fullPhoneNumber },
      {
        onSuccess: (data) => {
          setVerificationId(data.verificationId);
          setCounter(100);
        },
      }
    );
  };

  // QUERY FOR VERYFING PHONE
  const onVerifyOtp = () => {
    if (!verificationId) {
      return;
    }
    verifyPhoneOtp(
      { verificationId, otp },
      {
        onSuccess: (data) => {
          setIsVerified(true);
          onboardingContex.updateData({
            phone: countryCode+phoneNumber,
            phoneVerificationToken: data.verificationToken
          })
        },
      }
    );
  };

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box mb={1}>
          <Typography variant="subtitle2">Phone Number</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="555 666 777"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Autocomplete
                    freeSolo
                    options={countryCodes}
                    value={countryCode}
                    sx={{
                      border: "1px solid",
                      borderColor: "primary.main",
                      width: "80px",
                      padding: "0px 8px",
                      borderRadius: 50,
                      fontSize: "12px",
                    }}
                    onInputChange={(_, newInputValue) =>
                      setCountryCode(newInputValue)
                    }
                    onChange={(_, newValue) => {
                      if (typeof newValue === "string") {
                        setCountryCode(newValue);
                      }
                    }}
                    popupIcon={<ArrowDropDownIcon />}
                    clearIcon={null}
                    forcePopupIcon
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        aria-label="Country code"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            aria-label="Send phone verification code"
            onClick={onSendPhone}
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
              phoneNumber.trim() === "" ||
              counter > 0 ||
              isInitiateLoading
            }
          >
            {counter > 0 ? "Sent" : "Send"}
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
          <Typography variant="subtitle2">
            Phone Verification Code
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            fullWidth
            aria-label="Phone verification code"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            variant="contained"
            aria-label="Verify phone verification code"
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
            disabled={
              otp.trim() === "" || isVerifyLoading 
            }
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

export default PhoneVerification;
