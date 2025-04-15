import { Box, Button, Typography } from "@mui/material";
import successImage from "../../../assets/success.svg";
import errorImage from "../../../assets/error.svg";

export interface StatusComponentProps {
  variant: "success" | "danger";
  title: string;
  message: string;
  buttonText: string;
  href: string;
}

const StatusComponent = ({
  variant,
  title,
  message,
  buttonText,
  href,
}: StatusComponentProps) => {
  const imageMap = {
    success: successImage,
    danger: errorImage,
  };

  const altText = variant === "success" ? "Success icon" : "Error icon";

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <img src={imageMap[variant]} alt={altText} width={80} height={80} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {message}
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} href={href}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default StatusComponent;
