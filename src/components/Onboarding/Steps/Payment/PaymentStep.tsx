import React, { useEffect, useState } from "react";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavigationConfig } from "../../../common/NavigationButtons/NavigationButtons";

const paymentOptions = [
  {
    label: "Credit/Debit Card",
    icon: <CreditCardIcon />,
    type: "credit",
  },
  {
    label: "Sepa",
    icon: <AccountBalanceIcon />,
    type: "sepa",
  },
  {
    label: "Apple Pay",
    icon: <AppleIcon />,
    type: "provider",
    url: "https://www.apple.com/apple-pay/",
  },
  {
    label: "Google Pay",
    icon: <GoogleIcon />,
    type: "provider",
    url: "https://pay.google.com",
  },
  {
    label: "PayPal",
    icon: <PaymentIcon />,
    type: "provider",
    url: "https://www.paypal.com",
  },
];

interface BackButtonProps {
  onBack: () => void;
}

interface PaymentStepProps {
  setNavConfig: (config: NavigationConfig) => void;
}

const CreditComponent = ({ onBack }: BackButtonProps) => (
  <Box>
    <IconButton onClick={onBack} size="small">
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
    <h2>Credit Card Payment Component</h2>
  </Box>
);

const SEPAComponent = ({ onBack }: BackButtonProps) => (
  <Box>
    <IconButton onClick={onBack} size="small">
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
    <h2>SEPA Payment Component</h2>
  </Box>
);

const PaymentStep = ({ setNavConfig }: PaymentStepProps) => {
  useEffect(() => {
    setNavConfig({
      nextLabel: "Next",
      hideBack: true,
      skipLabel: "Skip",
      disableNext: false,
    });
  }, [setNavConfig]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: (typeof paymentOptions)[number]) => {
    if (option.type === "credit") {
      setSelectedOption("credit");
    } else if (option.type === "sepa") {
      setSelectedOption("sepa");
    } else if (option.type === "provider" && option.url) return;
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  if (selectedOption === "credit") {
    return <CreditComponent onBack={handleBack} />;
  }

  if (selectedOption === "sepa") {
    return <SEPAComponent onBack={handleBack} />;
  }

  return (
    <Box>
      {paymentOptions.map((option, index) => (
        <React.Fragment key={option.label}>
          <ListItem
            onClick={() => handleOptionClick(option)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.label} />
            <IconButton edge="end">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </ListItem>
          {index < paymentOptions.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default PaymentStep;
