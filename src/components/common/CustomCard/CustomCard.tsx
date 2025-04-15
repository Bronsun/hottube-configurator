import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LinkImage from "../../atomic/Image/LinkImage";

export interface CustomCardProps {
  imageUrl: string;
  description: string;
  buttonColor:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  buttonText: string;
  onClick: () => void;
}

const CustomCard = ({
  imageUrl,
  description,
  buttonColor,
  buttonText,
  onClick,
}: CustomCardProps) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flex: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:2,md:2}}>
            <LinkImage
              src={imageUrl}
              alt="Login Method"
              height="50px"
              width="50px"
            />
          </Grid>
          <Grid size={{xs:10,md:10}}>
            <Typography variant="body1">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button variant="contained" color={buttonColor} fullWidth onClick={onClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
