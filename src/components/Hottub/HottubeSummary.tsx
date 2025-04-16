import { Box, Divider, List, ListItem, ListItemText, Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface HottubeSummaryProps {
  modelName: string;
  collection: string;
  shellColorName: string;
  cabinetColorName: string;
  seating: string;
  waterCare: string;
  entertainmentSystem: string;
  controlSystem: string;
  accessories: {
    [key: string]: boolean;
  };
  servicePackage: string;
  basePrice: string;
  additionalCost: number;
  hasLoungeSeat?: boolean;
}

const HottubeSummary = ({
  modelName,
  collection,
  shellColorName,
  cabinetColorName,
  seating,
  waterCare,
  entertainmentSystem,
  controlSystem,
  accessories,
  servicePackage,
  basePrice,
  additionalCost,
  hasLoungeSeat,
}: HottubeSummaryProps) => {
  const { t } = useTranslation();
  
  // Check if any accessories are selected
  const hasSelectedAccessories = Object.values(accessories).some(value => value === true);

  // Get the names of selected accessories with their prices
  const getSelectedAccessoriesText = () => {
    const accessoryItems: string[] = [];
    
    // Handle dynamic accessories
    Object.keys(accessories).forEach(key => {
      if (accessories[key]) {
        // Use predefined prices for legacy accessories
        if (key === 'coverCradle') {
          accessoryItems.push(`${t('hottub.accessoryOptions.coverCradle')} (+$300)`);
        } else if (key === 'steps') {
          accessoryItems.push(`${t('hottub.accessoryOptions.steps')} (+$200)`);
        } else if (key === 'cover') {
          accessoryItems.push(`${t('hottub.cover', 'Hot Tub Cover')} (${t('hottub.includedPrice', 'Included')})`);
        } else if (key === 'cover-cradle') {
          accessoryItems.push(`${t('hottub.accessoryOptions.coverCradle')} (+$300)`);
        } else {
          // For other accessories we don't have a fixed price text
          accessoryItems.push(key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
        }
      }
    });
    
    return accessoryItems.join(", ");
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hottub.summary.title')}
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={t('hottub.summary.model')}
            secondary={`${collection} ${modelName}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={t('hottub.summary.shellColor')}
            secondary={shellColorName}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={t('hottub.summary.cabinetColor')}
            secondary={cabinetColorName}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={t('hottub.summary.seating')}
            secondary={
              <>
                {seating}
                {hasLoungeSeat && (
                  <Chip 
                    label={t('hottub.loungeSeat', 'With Lounge Seat')} 
                    size="small" 
                    color="secondary" 
                    sx={{ ml: 1 }} 
                  />
                )}
              </>
            }
          />
        </ListItem>

        {/* Added Options */}
        {waterCare && (
          <ListItem>
            <ListItemText
              primary={t('hottub.summary.waterCare')}
              secondary={waterCare}
            />
          </ListItem>
        )}
        
        {controlSystem && (
          <ListItem>
            <ListItemText
              primary={t('hottub.summary.smartControl')}
              secondary={controlSystem}
            />
          </ListItem>
        )}
        
        {entertainmentSystem && (
          <ListItem>
            <ListItemText
              primary={t('hottub.summary.entertainment')}
              secondary={entertainmentSystem}
            />
          </ListItem>
        )}
        
        {hasSelectedAccessories && (
          <ListItem>
            <ListItemText
              primary={t('hottub.summary.accessories')}
              secondary={getSelectedAccessoriesText()}
            />
          </ListItem>
        )}
        
        {servicePackage !== "none" && (
          <ListItem>
            <ListItemText
              primary={t('hottub.summary.servicePackage')}
              secondary={
                servicePackage === "one-year"
                  ? `${t('hottub.servicePackage.oneYear')} (+$500)`
                  : servicePackage === "three-year"
                  ? `${t('hottub.servicePackage.threeYear')} (+$1,200)`
                  : `${t('hottub.servicePackage.fiveYear')} (+$1,800)`
              }
            />
          </ListItem>
        )}
      </List>

      {/* Display additional costs */}
      {additionalCost > 0 && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            {t('hottub.summary.basePrice')}: {basePrice}
          </Typography>
          <Typography variant="body2">
            {t('hottub.summary.options')}: +${additionalCost.toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HottubeSummary;