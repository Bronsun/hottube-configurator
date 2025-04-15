import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import PageTitle from "../../components/atomic/PageTitle/PageTitle";
import Grid from "@mui/material/Grid2";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PassesCard from "../../components/common/PassesCard/PassesCard";
import Carousel from "../../components/common/Carousel/Carousel";

const DashboardPage = () => {
  return (
    <Box>
      <PageTitle title="Dashboard" />
      <Box
        sx={{
          justifyContent: "center",

          justifyItems: "center",
        }}
      >
        <Carousel>
        <PassesCard
          cardNumber={"2132"}
          cardType={"Something"}
          validUntil={"01/12/1998"}
          bgColorPrimary={"primary.main"}
        />
        <PassesCard
          cardNumber={"2132"}
          cardType={"Something"}
          validUntil={"01/12/1998"}
          bgColorPrimary={"secondary.main"}
        />
         <PassesCard
          cardNumber={"2132"}
          cardType={"Something"}
          validUntil={"01/12/1998"}
          bgColorPrimary={"secondary.main"}
        />


        </Carousel>
       

        <Button
          variant="contained"
          color="secondary"
          startIcon={<LocalActivityIcon />}
          sx={{ mt: 2, mr: 1 }}
        >
          Use your pass
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          startIcon={<LocalActivityIcon />}
        >
          Buy ticket
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Card sx={{ minWidth: "100%" }}>
          <CardContent>
            <Typography variant="body2">Current consumption</Typography>
            <Typography variant="h4">168 $</Typography>
            <Button sx={{ mt: 2 }} variant="outlined" fullWidth color="primary">
              Manage payments
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">My Family Area</Typography>
                <Typography sx={{ mt: 2 }} variant="body2">
                  Manage your family accounts in here.
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  fullWidth
                  color="primary"
                >
                  Manage my family
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Bike Box</Typography>
                <Typography sx={{ mt: 2 }} variant="body2">
                  Do you need a box for your bike?
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  fullWidth
                  color="primary"
                >
                  Activate Bike Box
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
