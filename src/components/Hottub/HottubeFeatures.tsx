import { Box, Card, CardContent, Typography, Grid, Divider, List, ListItem, ListItemText, Chip } from "@mui/material";
import { Extra } from "../../models/HotTubeModel";
import { formatDimensions } from "../../utils/hottubes";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
interface HottubeFeaturesProps {
  seating: string;
  dimensions: string;
  jets: string;
  watercare: string;
  extras: Extra[];
}

const HottubeFeatures = ({ seating, dimensions, jets, watercare, extras }: HottubeFeaturesProps) => {
  
  // Check if there's a lounge seat feature
  const hasLoungeSeat = extras.some(extra => 
    extra.name.includes("Lezanka") || 
    extra.description.includes("Fotel wypoczynkowy")
  );
  
  // Get the lounge seat feature for its description
  const loungeSeatFeature = extras.find(extra => 
    extra.name.includes("Lezanka") || 
    extra.description.toLowerCase().includes("Fotel wypoczynkowy")
  );
  
  return (
    <Card variant="outlined">
      <CardContent>
      
        <Typography variant="h6" gutterBottom>
            Funkcje i cechy:
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Ilość miejsc:</strong> {seating}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Wymiary:</strong> {formatDimensions(dimensions)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Dysze:</strong> {jets.split(" ")[0]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Pielęgnacja wody:</strong> {watercare}
            </Typography>
          </Grid>
          
          {/* Highlight lounge seat feature if present */}
          {hasLoungeSeat && (
            <Grid item xs={12}>
              <Box sx={{ mt: 1, mb: 2, display: 'flex', alignItems: 'center' }}>
                <Chip 
                  color="secondary" 
                  label="Fotel wypoczynkowy" 
                  sx={{ mr: 1 }} 
                />
                <Typography variant="body2">
                  {loungeSeatFeature?.description || "Wygodny fotel wypoczynkowy"}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Extras/Features */}
        <Chip
        icon={<LocalShippingIcon />}
        label={"Darmowa dostawa i montaż"}
        variant="outlined"
        color="success"
        sx={{mt:2}}
      />
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
          Dodatkowe opcje:
        </Typography>
        <List dense>
          {extras.map((extra, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={extra.name}
                secondary={extra.description}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default HottubeFeatures;