import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LinkImage from "../atomic/Image/LinkImage";
import EUImage from "../../assets/eu-sign.png";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{ p: 4, mt: "auto", backgroundColor: "rgba(246, 248, 249, 1)" }}
      >
        <Container>
          <Grid container spacing={{ md: 4, xs: 2 }}>
            {/* Logo Section */}
            <Grid size={{xs:12,md:4}}>
              <Box>
                <LinkImage width={124} height={64} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinkImage src={EUImage} width={300} height={70} />
              </Box>
            </Grid>

            {/* Information Section */}
            <Grid  size={{xs:12,md:8}}>
              <Grid container spacing={4}>
                {/* Service Desk and Email */}
                <Grid size={{xs:12,md:4}}>
                  <Box>
                    <Typography variant="body2">Service desk:</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      +39 0471 220880
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2">Email:</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      info@sta.bz.it
                    </Typography>
                  </Box>
                </Grid>

                {/* Menu */}
                <Grid  size={{xs:12,md:4}}>
                  <Box>
                    <Typography variant="body2">Menu:</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Legal notice
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Privacy & cookie policy
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Terms of use
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Complaints
                    </Typography>
                  </Box>
                </Grid>

                {/* Social */}
                <Grid  size={{xs:12,md:4}}>
                  <Box>
                    <Typography variant="body2">Follow us:</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Facebook
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Instagram
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ backgroundColor: "#EDF0F1", p: 2, textAlign: "center" }}>
        <Typography variant="body1">
          STA – Strutture Trasporto Alto Adige SpA, Via dei Conciapelli, 60, I-39100 Bolzano
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
