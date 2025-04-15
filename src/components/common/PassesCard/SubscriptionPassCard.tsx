import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useTheme } from "@mui/material/styles";
import LogoWhite from "../../../assets/logo-white.svg";

interface SubscriptionPassCardProps {
  headerTitle: string;
  headerBgColor?: string;
  description: string;
  price: string | number;
  available: string | number;
  howToUse: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const SubscriptionPassCard = ({
  headerTitle,
  headerBgColor,
  description,
  price,
  available,
  howToUse,
  buttonText,
  onButtonClick,
}:SubscriptionPassCardProps) => {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 400 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: headerBgColor || theme.palette.primary.main,
            p:2,
            borderRadius: "0 0 0 20px",
            width: "98%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: 2 }}>
            {/* Placeholder for Image */}
            <img src={LogoWhite} alt="Logo" style={{ width: 78, height: 40 }} />
          </Box>
          <Typography variant="h6" color="primary.contrastText">
            {headerTitle}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        {/* Short Description */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {/* Table for Price, Available, How to use */}
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TableCell>
                  <Typography variant="subtitle2">Price:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">{price}</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TableCell>
                  <Typography variant="subtitle2">Available:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">{available}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">How to use:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">{howToUse}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Navigation Button */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<ConfirmationNumberIcon />}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPassCard;
