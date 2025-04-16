import {
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormLabel,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";

// Define an Accessory interface to match the structure in the JSON
interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

interface HottubeConfigOptionsProps {
  modelName: string;
  collection: string; // Add the collection prop to check if it's from the Utopia series
  shellColors: Array<{ name: string; shellIMG: string }>;
  cabinetColors: Array<{ color: string; cabinetIMG: string }>;
  shellIndex: number;
  cabinetIndex: number;
  waterCareOptions: Array<{ id: string; name: string; description: string; price: number; isDefault?: boolean, imageUrl?:string }>;
  entertainmentOptions: Array<{ id: string; name: string; description: string; price: number; isDefault?: boolean,imageUrl?:string }>;
  controlOptions: Array<{ id: string; name: string; description: string; price: number; isDefault?: boolean,imageUrl?:string }>;
  servicePackages: Array<{ id: string; name: string; description: string; price: number; isDefault: boolean, imageUrl?:string }>;
  selectedWaterCareId: string;
  selectedEntertainmentId: string;
  selectedControlId: string;
  selectedServicePackageId: string; // Add new prop for the selected service package
  accessories: { [key: string]: boolean };
  setShellIndex: (index: number) => void;
  setCabinetIndex: (index: number) => void;
  setSelectedWaterCareId: (id: string) => void;
  setSelectedEntertainmentId: (id: string) => void;
  setSelectedControlId: (id: string) => void;
  handleAccessoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setServicePackage: (value: string) => void;
  availableAccessories?: Accessory[];
}

const HottubeConfigOptions: React.FC<HottubeConfigOptionsProps> = ({
  collection,
  shellColors,
  cabinetColors,
  shellIndex,
  cabinetIndex,
  waterCareOptions,
  entertainmentOptions,
  controlOptions,
  servicePackages,
  selectedWaterCareId,
  selectedEntertainmentId,
  selectedControlId,
  selectedServicePackageId,
  accessories,
  setShellIndex,
  setCabinetIndex,
  setSelectedWaterCareId,
  setSelectedEntertainmentId,
  setSelectedControlId,
  handleAccessoryChange,
  setServicePackage,
  availableAccessories = [],
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Format price for display
  const formatPrice = (price: number): string => {
    if (price === 0) return t('hottub.includedPrice', '0');
    return `+${price.toLocaleString()}`;
  };

  // Check if a shell color is disabled based on the cabinet selection
  const isShellDisabled = (shellColorName: string) => {
    // Only for Utopia series: Platinum shell can't be used with Parchment cabinet
    if (collection === 'Utopia' && 
        shellColorName === 'Platinum' && 
        cabinetColors[cabinetIndex]?.color === 'Parchment') {
      return true;
    }
    return false;
  };

  return (
    <Box sx={{ pb: 4 }}>
      
      {/* Shell Color Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t('hottub.selectShellColor')}
        </Typography>
        <Grid container spacing={1}>
          {shellColors.map((color, index) => {
            const isDisabled = isShellDisabled(color.name);
            
            return (
              <Grid item xs={4} sm={3} md={4} key={color.name}>
                <Tooltip 
                  title={isDisabled ? t('hottub.platinumShellNotAvailable', "Platinum shell is not available with Parchment cabinet in Utopia series") : ""}
                  arrow
                  placement="top"
                >
                  <Box> {/* Wrapper needed for disabled tooltip */}
                    <Card 
                      onClick={() => !isDisabled && setShellIndex(index)} 
                      sx={{ 
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        border: shellIndex === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: isDisabled ? 0.5 : 1,
                        filter: isDisabled ? 'grayscale(50%)' : 'none',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={isMobile ? "60" : "50"}
                        image={color.shellIMG}
                        alt={color.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ p: 1, textAlign: 'center' }}>
                        <Typography variant="caption">
                          {color.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Cabinet Color Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t('hottub.selectCabinetColor')}
        </Typography>
        <Grid container spacing={1}>
          {cabinetColors.map((color, index) => {
            // Check if selecting this cabinet would disable the currently selected shell
            const wouldDisableCurrentShell = 
              collection === 'Utopia' && 
              color.color === 'Parchment' && 
              shellColors[shellIndex]?.name === 'Platinum';

            return (
              <Grid item xs={4} sm={3} md={4} key={color.color}>
                <Tooltip 
                  title={wouldDisableCurrentShell ? 
                    t('hottub.parchmentCabinetWillChangeShell', "Selecting Parchment cabinet will change your shell selection (Platinum not available)") : ""}
                  arrow
                  placement="top"
                >
                  <Card 
                    onClick={() => {
                      setCabinetIndex(index);
                      
                      // If selecting this cabinet would disable the currently selected shell,
                      // automatically change to the first available shell
                      if (wouldDisableCurrentShell) {
                        // Find first non-platinum shell
                        const firstValidShellIndex = shellColors.findIndex(
                          shell => shell.name !== 'Platinum'
                        );
                        if (firstValidShellIndex !== -1) {
                          setShellIndex(firstValidShellIndex);
                        }
                      }
                    }} 
                    sx={{ 
                      cursor: 'pointer',
                      border: cabinetIndex === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? "60" : "50"}
                      image={color.cabinetIMG}
                      alt={color.color}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ p: 1, textAlign: 'center' }}>
                      <Typography variant="caption">
                        {color.color}
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Water Care Options */}
      {waterCareOptions.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('hottub.waterCare')}
          </Typography>
          <Grid container spacing={2}>
            {waterCareOptions.map((option) => (
              <Grid item xs={12} sm={6} md={6} key={option.id}>
                <Card 
                  onClick={() => setSelectedWaterCareId(option.id)} 
                  sx={{ 
                    cursor: 'pointer',
                    border: selectedWaterCareId === option.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "120" : "140"}
                    image={option.imageUrl}
                    alt={option.name}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {option.name}
                      </Typography>
                      <Checkbox 
                        checked={selectedWaterCareId === option.id} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWaterCareId(option.id);
                        }}
                        sx={{ p: 0.5 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(option.price)} zł
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Entertainment System Options */}
      {entertainmentOptions.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('hottub.entertainment')}
          </Typography>
          <Grid container spacing={2}>
            {entertainmentOptions.map((option) => (
              <Grid item xs={12} sm={6} md={6} key={option.id}>
                <Card 
                  onClick={() => setSelectedEntertainmentId(option.id)} 
                  sx={{ 
                    cursor: 'pointer',
                    border: selectedEntertainmentId === option.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "120" : "140"}
                    image={option.imageUrl}
                    alt={option.name}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {option.name}
                      </Typography>
                      <Checkbox 
                        checked={selectedEntertainmentId === option.id} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEntertainmentId(option.id);
                        }}
                        sx={{ p: 0.5 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(option.price)} zł
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Control System Options */}
      {controlOptions.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('hottub.control')}
          </Typography>
          <Grid container spacing={2}>
            {controlOptions.map((option) => (
              <Grid item xs={12} sm={6} md={6} key={option.id}>
                <Card 
                  onClick={() => setSelectedControlId(option.id)} 
                  sx={{ 
                    cursor: 'pointer',
                    border: selectedControlId === option.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "120" : "140"}
                    image={option.imageUrl}
                    alt={option.name}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {option.name}
                      </Typography>
                      <Checkbox 
                        checked={selectedControlId === option.id} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedControlId(option.id);
                        }}
                        sx={{ p: 0.5 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(option.price)} zł
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Accessories */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t('hottub.accessories')}
        </Typography>
        <Grid container spacing={2}>
          {availableAccessories.length > 0 ? (
            availableAccessories.map((accessory) => (
              <Grid item xs={12} sm={6} md={6} key={accessory.id}>
                <Card 
                  onClick={() => {
                    const event = {
                      target: {
                        name: accessory.id,
                        checked: !(accessories[accessory.id] || false)
                      }
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleAccessoryChange(event);
                  }} 
                  sx={{ 
                    cursor: 'pointer',
                    border: accessories[accessory.id] ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "120" : "140"}
                    image={accessory.imageUrl}
                    alt={accessory.name}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {accessory.name}
                      </Typography>
                      <Checkbox 
                        checked={accessories[accessory.id] || false} 
                        onChange={(e) => {
                          const event = {
                            target: {
                              name: accessory.id,
                              checked: e.target.checked
                            }
                          } as React.ChangeEvent<HTMLInputElement>;
                          handleAccessoryChange(event);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ p: 0.5 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {accessory.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(accessory.price)} zł
                    </Typography>
                    {accessory.category && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                        {t('hottub.category', 'Kategoria')}: {accessory.category}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            // Fallback to old hardcoded accessories if no new ones are provided
            <>
              <Grid item xs={12} sm={6} md={6}>
                <Card 
                  onClick={() => {
                    const event = {
                      target: {
                        name: 'coverCradle',
                        checked: !accessories.coverCradle
                      }
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleAccessoryChange(event);
                  }} 
                  sx={{ 
                    cursor: 'pointer',
                    border: accessories.coverCradle ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "120" : "140"}
                    image={'https://www.calderaspas.com/wp-content/uploads/2024/05/caldera-spas-paradise-seycheles-articwhite-java-proliftiii-coverlifter.jpg'}
                    alt={t('hottub.accessoryOptions.coverCradle')}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {t('hottub.accessoryOptions.coverCradle')}
                      </Typography>
                      <Checkbox 
                        checked={accessories.coverCradle} 
                        onChange={(e) => {
                          const event = {
                            target: {
                              name: 'coverCradle',
                              checked: e.target.checked
                            }
                          } as React.ChangeEvent<HTMLInputElement>;
                          handleAccessoryChange(event);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ p: 0.5 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('hottub.accessoryOptions.coverCradleDescription')}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(300)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card 
                  onClick={() => {
                    const event = {
                      target: {
                        name: 'steps',
                        checked: !accessories.steps
                      }
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleAccessoryChange(event);
                  }} 
                  sx={{ 
                    cursor: 'pointer',
                    border: accessories.steps ? `2px solid ${theme.palette.primary.main}` : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "120" : "140"}
                    image={'https://www.calderaspas.com/wp-content/uploads/2017/02/560x406-Avante-Step-Sand.jpg'}
                    alt={t('hottub.accessoryOptions.steps')}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {t('hottub.accessoryOptions.steps')}
                      </Typography>
                      <Checkbox 
                        checked={accessories.steps} 
                        onChange={(e) => {
                          const event = {
                            target: {
                              name: 'steps',
                              checked: e.target.checked
                            }
                          } as React.ChangeEvent<HTMLInputElement>;
                          handleAccessoryChange(event);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ p: 0.5 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('hottub.accessoryOptions.stepsDescription')}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(200)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Service Package */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t('hottub.servicePackage.title')}
            </Typography>
          </FormLabel>
          <RadioGroup
            value={selectedServicePackageId}
            onChange={(e) => setServicePackage(e.target.value)}
          >
            {servicePackages.map((packageOption) => (
              <FormControlLabel
                key={packageOption.id}
                value={packageOption.id}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body2">
                      {packageOption.name} {formatPrice(packageOption.price)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {packageOption.description}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default HottubeConfigOptions;