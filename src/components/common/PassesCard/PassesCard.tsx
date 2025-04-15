import React from "react";
import { Box, Typography, Card } from "@mui/material";
import LogoImage from "../../../assets/logo-white.svg";

interface PassesCardProps {
  bgColorPrimary?: string;
  logoSrc?: string;
  cardNumber: string;
  qrCodeComponent?: React.ReactNode;
  cardType: string;
  validUntil: string;
}

const PassesCard = ({
  bgColorPrimary = "var(--bg-color-primary)",
  logoSrc = LogoImage,
  cardNumber,
  qrCodeComponent,
  cardType,
  validUntil,
}: PassesCardProps) => {
  return (
    <Card
      sx={{
        width: { md: "25vw", xs: "90vw" },
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* Top section with colored background */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Box
              sx={{
                backgroundColor: bgColorPrimary,
                pl: 2,
                pr: 2,

                pt: 1,
                borderRadius: "0 0 0 20px",
                width: "98%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Left Column: Caption, Logo, Card Number */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary.contrastText",
                      textAlign: "left",
                      mb: 1,
                    }}
                  >
                    Sudtirol Pass
                  </Typography>
                  <Box
                    component="img"
                    src={logoSrc}
                    alt="logo"
                    sx={{ mb: 1 }}
                    width={"80px"}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.contrastText",
                      textAlign: "left",
                    }}
                  >
                    {cardNumber}
                  </Typography>
                </Box>
                {/* Right Column: QR Code */}
                <Box
                  sx={{
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {qrCodeComponent ? (
                    qrCodeComponent
                  ) : (
                    <Box
                      role="img"
                      sx={{
                        transform: "translateY(25%)",
                        height: 140,
                        width: 140,
                        borderRadius: "8px",
                        backgroundColor: "grey.300",
                        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Bottom Section: Card Type & Validity */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", textAlign: "left" }}
            >
              {cardType}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                textAlign: "left",
              }}
            >
              Valid until - {validUntil}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PassesCard;
