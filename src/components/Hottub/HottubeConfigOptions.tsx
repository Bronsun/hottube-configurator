import {
  Typography,
  Box,
  Checkbox,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
  Popover,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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

  // State for the FreshWater info popover
  const [freshWaterAnchorEl, setFreshWaterAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleFreshWaterPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFreshWaterAnchorEl(event.currentTarget);
  };
  const handleFreshWaterPopoverClose = () => {
    setFreshWaterAnchorEl(null);
  };
  const freshWaterPopoverOpen = Boolean(freshWaterAnchorEl);

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
                  title={isDisabled ? t('hottub.platinumShellNotAvailable', "Platinum nie jest dostępne z Perchnament") : ""}
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
                    t('hottub.parchmentCabinetWillChangeShell', "Platinum nie jest dostępne z Perchnament") : ""}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t('hottub.waterCare')}
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleFreshWaterPopoverOpen}
              aria-describedby={freshWaterPopoverOpen ? 'freshwater-popover' : undefined}
              sx={{ ml: 0.5, color: theme.palette.info.main }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
            <Popover
              id="freshwater-popover"
              open={freshWaterPopoverOpen}
              anchorEl={freshWaterAnchorEl}
              onClose={handleFreshWaterPopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Box sx={{ p: 3, maxWidth: 400 }}>
                <Typography variant="h6" gutterBottom>Zapomnij o zgadywaniu, jak dbać o wodę!</Typography>
                <Typography variant="body2" paragraph>
                  Naszą misją jest pomoc w czerpaniu korzyści zdrowotnych z regularnego korzystania z wanny SPA poprzez ułatwienie pielęgnacji wody. Z systemami Caldera® możesz zmniejszyć użycie chemikaliów i zredukować zapach chloru, jednocześnie utrzymując wodę w wannie zdezynfekowaną, zdrową i gotową do użycia w każdej chwili.
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>System FreshWater® IQ</Typography>
                <Typography variant="body2" paragraph>
                  FreshWater IQ to inteligentny system pielęgnacji wody, który regularnie bada wodę w Twoim SPA i wyświetla jasne instrukcje, aby pomóc Ci utrzymać czystą wodę o naturalnym odczuciu. Teraz, jednym spojrzeniem na panel sterowania, zobaczysz co jest potrzebne, aby woda w Twoim SPA była zawsze świeża, zbilansowana i gotowa do korzystania!
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>System solny FreshWater®</Typography>
                <Typography variant="body2" paragraph>
                  Nasz unikalny i opatentowany projekt automatycznie generuje chlor z soli, utrzymując wodę czystą i świeżą do 3 razy dłużej niż jakikolwiek inny system. W końcu to Twoje SPA powinno dbać o Ciebie, a nie na odwrót.
                </Typography>
                <Typography variant="body2" paragraph>
                  Ten łatwy w użyciu system jest dostępny we wszystkich modelach serii Utopia® i Paradise® wyprodukowanych od 2019 roku.
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>Uzdatniacze wody</Typography>
                <Typography variant="body2">
                  Wykorzystaj w pełni swój system pielęgnacji wody z tymi bezchemicznymi akcesoriami, aby zapewnić sobie zawsze świeżą, czystą wodę.
                </Typography>
              </Box>
            </Popover>
          </Box>
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
        
         {   availableAccessories.map((accessory) => (
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
            ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Service Package */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {t('hottub.servicePackage.title')}
        </Typography>
        <Grid container spacing={2}>
          {servicePackages.map((packageOption) => (
            <Grid item xs={12} sm={6} md={6} key={packageOption.id}>
              <Card 
                onClick={() => setServicePackage(packageOption.id)} 
                sx={{ 
                  cursor: 'pointer',
                  border: selectedServicePackageId === packageOption.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 1
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {packageOption.name}
                    </Typography>
                    <Checkbox 
                      checked={selectedServicePackageId === packageOption.id} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setServicePackage(packageOption.id);
                      }}
                      sx={{ p: 0.5 }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {packageOption.description}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    {formatPrice(packageOption.price)} zł
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HottubeConfigOptions;