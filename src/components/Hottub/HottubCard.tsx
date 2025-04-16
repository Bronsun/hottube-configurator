import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  Button 
} from "@mui/material";
import { HotTube, ShellColor, CabinetColor } from "../../models/HotTubeModel";
import { useTranslation } from "react-i18next";
import { formatDimensions } from "../../utils/hottubes";

interface HottubCardProps {
  hottub: HotTube;
  shellColor: ShellColor;
  cabinetColor: CabinetColor;
  shellIndex: number;
  cabinetIndex: number;
  onColorChange: (hottubId: string, colorType: "shell" | "cabinet", index: number) => void;
  onConfigure: (hottubId: string) => void;
}

const HottubCard = ({
  hottub,
  shellColor,
  cabinetColor,
  shellIndex,
  cabinetIndex,
  onColorChange,
  onConfigure,
}: HottubCardProps) => {
  const { t } = useTranslation();

  // Helper function to check if a hot tub has a lounge seat
  const hasLoungeSeat = () => {
    return hottub.extras?.some((extra) => 
      extra.name.toLowerCase().includes('lounge') || 
      extra.description.toLowerCase().includes('lounge seat') ||
      extra.value.toLowerCase().includes('lounge')
    );
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.01)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      {/* Layered images: shell on top, cabinet underneath */}
      <Box
        sx={{
          height: "400px",
          textAlign: "center",
          justifyContent: "center",
          p: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            zIndex: 2,
          }}
          image={shellColor.shellIMG}
          alt={`${hottub.model} shell - ${shellColor.name}`}
        />
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            textAlign: "center",
            zIndex: 1,
          }}
          image={cabinetColor.cabinetIMG}
          alt={`${hottub.model} cabinet - ${cabinetColor.color}`}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              {hottub.model}
            </Typography>
            <Chip
              label={hottub.collection}
              size="small"
              color="primary"
            />
          </Box>

          {/* Lounge Seat Indicator */}
          {hasLoungeSeat() && (
            <Chip
              label="Lounge Seat"
              size="small"
              color="secondary"
              sx={{ mb: 2 }}
            />
          )}
        </Box>

        {/* Main content area */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Shell Colors */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              {t('hottub.selectShellColor')}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {hottub.colors.shellColors.map((color, index) => (
                <Box
                  key={`shell-${hottub.id}-${index}`}
                  sx={{
                    width: "24px",
                    height: "24px",
                    border: shellIndex === index
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                    borderRadius: "50%",
                    backgroundImage: `url(${color.selectorColorIMG})`,
                    backgroundSize: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => onColorChange(hottub.id, "shell", index)}
                  title={color.name}
                />
              ))}
            </Box>
          </Box>

          {/* Cabinet Colors */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" display="block" gutterBottom>
              {t('hottub.selectCabinetColor')}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {hottub.colors.cabinetColors.map((color, index) => (
                <Box
                  key={`cabinet-${hottub.id}-${index}`}
                  sx={{
                    width: "24px",
                    height: "24px",
                    border: cabinetIndex === index
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                    borderRadius: "50%",
                    backgroundImage: `url(${color.selectorColorIMG})`,
                    backgroundSize: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => onColorChange(hottub.id, "cabinet", index)}
                  title={color.color}
                />
              ))}
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t('hottub.summary.seating')}: {hottub.seating}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t('hottub.dimensions', {wymiary: formatDimensions(hottub.dimensions), defaultValue: `Wymiary: ${formatDimensions(hottub.dimensions)}`})}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t('hottub.jets', {dysze: hottub.jets.split(" ")[0], defaultValue: `Dysze: ${hottub.jets.split(" ")[0]}`})}
          </Typography>
        </Box>

        {/* Price and button area - fixed to bottom */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: '1px solid #f0f0f0',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="primary">
            {hottub.price} zł Brutto
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onConfigure(hottub.id)}
          >
            {t('configurator.configure')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HottubCard;