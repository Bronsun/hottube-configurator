import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Helmet } from "react-helmet";

import { useHottubes, useAccessories, useServicePackages } from "../../utils/hottubes";
import HottubeImageDisplay from "../../components/Hottub/HottubeImageDisplay";
import HottubeFeatures from "../../components/Hottub/HottubeFeatures";
import HottubeConfigOptions from "../../components/Hottub/HottubeConfigOptions";
import HottubeSummary from "../../components/Hottub/HottubeSummary";
import HottubSpecChips from "../../components/Hottub/HottubSpecChips";
import HottubPricing from "../../components/Hottub/HottubPricing";
import ShareConfigurationDialog from "../../components/Hottub/ShareConfigurationDialog";

import { generateHotTubPDF } from "../../utils/pdfGenerator";
import { 
  calculateAdditionalCosts, 
  calculateTotalPrice, 
  getSelectedOptionName, 
  initializeAccessoriesData,
  initializeServicePackagesData 
} from "../../utils/pricingCalculator";
import { initializeServicePackagesForPdf } from "../../utils/pdfGenerator";

const HottubeDetailPage = () => {
  const { t } = useTranslation();
  const { hottubId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { hottubes, loading: hottubsLoading } = useHottubes();
  const { accessories: availableAccessories, loading: accessoriesLoading } = useAccessories();
  const { servicePackages, loading: servicePackagesLoading } = useServicePackages();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initialState = location.state || { shellIndex: 0, cabinetIndex: 0 };
  const hottub = hottubId ? hottubes.find((h) => h.id === hottubId) : undefined;

  // Initialize pricing calculator with accessories data when it's available
  useEffect(() => {
    if (availableAccessories && availableAccessories.length > 0) {
      initializeAccessoriesData(availableAccessories);
    }
  }, [availableAccessories]);

  // Initialize service packages data when available
  useEffect(() => {
    if (servicePackages && servicePackages.length > 0) {
      initializeServicePackagesData(servicePackages);
      initializeServicePackagesForPdf(servicePackages);
    }
  }, [servicePackages]);

  useEffect(() => {
    if (!hottubsLoading && !hottub && hottubId) {
      navigate("/configurator");
    }
  }, [hottub, navigate, hottubsLoading, hottubId]);

  // State for configuration options
  const [shellIndex, setShellIndex] = useState(initialState.shellIndex);
  const [cabinetIndex, setCabinetIndex] = useState(initialState.cabinetIndex);
  const [selectedWaterCareId, setSelectedWaterCareId] = useState("standard");
  const [selectedEntertainmentId, setSelectedEntertainmentId] = useState("none");
  const [selectedControlId, setSelectedControlId] = useState("standard");
  const [accessories, setAccessories] = useState<{ [key: string]: boolean }>({});
  const [servicePackage, setServicePackage] = useState("none");

  // Define the type for accessoriesWithPrices so it's not an empty object
  const [, setAccessoriesWithPrices] = useState<{[key: string]: {selected: boolean, price: number}}>({});

  // UI state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Initialize default values when hottub loads
  useEffect(() => {
    if (hottub && hottub.additionalOptions) {
      const defaultWaterCare = hottub.additionalOptions.waterCare?.find(
        (option) => option.isDefault
      );
      if (defaultWaterCare) {
        setSelectedWaterCareId(defaultWaterCare.id);
      }
      const defaultEntertainment = hottub.additionalOptions.entertainment?.find(
        (option) => option.isDefault
      );
      if (defaultEntertainment) {
        setSelectedEntertainmentId(defaultEntertainment.id);
      }
      const defaultControl = hottub.additionalOptions.control?.find(
        (option) => option.isDefault
      );
      if (defaultControl) {
        setSelectedControlId(defaultControl.id);
      }
    }
  }, [hottub]);

  // Initialize accessories with all options set to false
  useEffect(() => {
    if (availableAccessories && availableAccessories.length > 0) {
      const initialAccessories: { [key: string]: boolean } = {};
      availableAccessories.forEach(acc => {
        initialAccessories[acc.id] = false;
      });
      setAccessories(initialAccessories);
    } else {
      // Fallback to old structure if no accessories data available
      setAccessories({
        coverCradle: false,
        steps: false,
      });
    }
  }, [availableAccessories]);

  // When processing accessories
  useEffect(() => {
    if (hottub) {
      // Create a properly typed object for accessories
      const accessoryPrices: {[key: string]: {selected: boolean, price: number}} = {};

      // Add the accessories
      availableAccessories.forEach(accessory => {
        accessoryPrices[accessory.id] = {
          selected: false,
          price: accessory.price
        };
      });

      // Add specific accessories with initial values
      accessoryPrices["coverCradle"] = {
        selected: false,
        price: 899
      };

      accessoryPrices["steps"] = {
        selected: false,
        price: 1200
      };

      setAccessoriesWithPrices(accessoryPrices);
    }
  }, [hottub, availableAccessories]);

  // Process URL parameters with configuration
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("config") && hottub) {
      try {
        const config = JSON.parse(atob(searchParams.get("config") || ""));
        if (config.hottubId === hottub.id) {
          if (
            config.shellIndex !== undefined &&
            config.shellIndex >= 0 &&
            config.shellIndex < hottub.colors.shellColors.length
          ) {
            setShellIndex(config.shellIndex);
          }
          if (
            config.cabinetIndex !== undefined &&
            config.cabinetIndex >= 0 &&
            config.cabinetIndex < hottub.colors.cabinetColors.length
          ) {
            setCabinetIndex(config.cabinetIndex);
          }
          if (config.waterCareId) {
            setSelectedWaterCareId(config.waterCareId);
          }
          if (config.entertainmentId) {
            setSelectedEntertainmentId(config.entertainmentId);
          }
          if (config.controlId) {
            setSelectedControlId(config.controlId);
          }
          if (config.accessories) {
            setAccessories(config.accessories);
          }
          if (config.servicePackage) {
            setServicePackage(config.servicePackage);
          }
          setSnackbar({
            open: true,
            message: t('hottub.configLoadedSuccess', "Saved configuration loaded!"),
            severity: "success",
          });
        }
      } catch (error) {
        console.error("Error parsing configuration", error);
        setSnackbar({
          open: true,
          message: t('hottub.configLoadedError', "Error loading saved configuration"),
          severity: "error",
        });
      }
    }
  }, [location.search, hottub, t]);

  // Ensure servicePackages have isDefault property always set to a boolean
  const availableServicePackages = servicePackages.map(pkg => ({
    ...pkg,
    isDefault: pkg.isDefault === undefined ? false : pkg.isDefault
  }));

  const handleAccessoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessories({
      ...accessories,
      [event.target.name]: event.target.checked,
    });
  };

  const generateShareableLink = () => {
    if (!hottub) return window.location.href;
    const configData = {
      hottubId: hottub.id,
      shellIndex,
      cabinetIndex,
      waterCareId: selectedWaterCareId,
      entertainmentId: selectedEntertainmentId,
      controlId: selectedControlId,
      accessories,
      servicePackage,
    };
    const encodedConfig = btoa(JSON.stringify(configData));
    const url = new URL(window.location.href);
    url.search = `?config=${encodedConfig}`;
    return url.toString();
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleCopyLinkSuccess = () => {
    setSnackbar({
      open: true,
      message: t('hottub.linkCopied', "Link zapisany do schowka"),
      severity: "success",
    });
  };

  const handleGeneratePDF = async () => {
    if (!hottub) return;
    const selectedShellColor = hottub.colors.shellColors[shellIndex];
    const selectedCabinetColor = hottub.colors.cabinetColors[cabinetIndex];
    
    // Get selected water care option with price
    const waterCareOption = hottub.additionalOptions?.waterCare?.find(
      option => option.id === selectedWaterCareId
    );
    
    // Get selected entertainment option with price
    const entertainmentOption = hottub.additionalOptions?.entertainment?.find(
      option => option.id === selectedEntertainmentId
    );
    
    // Get selected control system option with price
    const controlOption = hottub.additionalOptions?.control?.find(
      option => option.id === selectedControlId
    );
    
    // Generate shareable link for the configuration
    const configurationUrl = generateShareableLink();
    
    // Update accessoriesWithPrices to match current selection
    const updatedAccessories: {[key: string]: {selected: boolean, price: number}} = {};
    
    // Add accessories from availableAccessories
    availableAccessories.forEach(acc => {
      updatedAccessories[acc.id] = {
        selected: !!accessories[acc.id],
        price: acc.price
      };
    });
    
    // Add legacy accessories
    if (accessories.coverCradle) {
      updatedAccessories.coverCradle = { selected: true, price: 899 };
    }
    
    if (accessories.steps) {
      updatedAccessories.steps = { selected: true, price: 1200 };
    }
    
    try {
      await generateHotTubPDF({
        modelName: hottub.model,
        collection: hottub.collection,
        shellColorName: selectedShellColor.name,
        cabinetColorName: selectedCabinetColor.color,
        seating: hottub.seating,
        basePrice: hottub.price,
        totalPrice: calculateTotalPrice(hottub, selectedWaterCareId, selectedEntertainmentId, selectedControlId, accessories, servicePackage),
        additionalOptions: {
          waterCare: waterCareOption ? {
            name: waterCareOption.name,
            price: waterCareOption.price
          } : undefined,
          entertainmentSystem: entertainmentOption ? {
            name: entertainmentOption.name,
            price: entertainmentOption.price
          } : undefined,
          controlSystem: controlOption ? {
            name: controlOption.name,
            price: controlOption.price
          } : undefined,
        },
        accessories: updatedAccessories,
        servicePackage,
        configurationUrl: configurationUrl,
      });
      
      setSnackbar({
        open: true,
        message: t('hottub.pdfGenerated', "Wycena przygotowana do pobrania!"),
        severity: "success",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      setSnackbar({
        open: true,
        message: t('hottub.pdfError', "Wystąpił błąd podczas generowania PDF"),
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Check if the hottub has a lounge seat
  const hasLoungeSeat = hottub?.extras?.some(
    (extra) =>
      extra.name.toLowerCase().includes('lounge') || 
      extra.description.toLowerCase().includes('lounge seat') ||
      extra.value.toLowerCase().includes('lounge')
  );

  if (hottubsLoading || accessoriesLoading || servicePackagesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!hottub) {
    return <Box>{t('common.loading')}</Box>;
  }

  const selectedShellColor = hottub.colors.shellColors[shellIndex];
  const selectedCabinetColor = hottub.colors.cabinetColors[cabinetIndex];

  // Get the number of jets from the full jet string
  const jetCount = hottub.jets.split(" ")[0];

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column",
      position: "relative", 
      pb: isMobile ? 0 : 8, // Only add bottom padding on desktop views
      height: !isMobile ? "calc(100vh - 64px)" : "auto", // Set a fixed height on desktop only (subtract navbar height)
      overflow: isMobile ? "auto" : "hidden" // Prevent main container overflow on desktop
    }}>
      <Helmet>
        <title>{`${hottub.model} ${hottub.collection} - ${t('hottub.detailTitle')} | MountSPA`}</title>
        <meta name="description" content={`${hottub.model} ${hottub.collection} - ${hottub.seating} - ${hottub.dimensions} - ${t('hottub.detailTitle')}`} />
        <meta name="keywords" content={`${hottub.model}, ${hottub.collection}, hot tub, spa, jacuzzi, ${hottub.seating.replace(/\s+/g, ', ')}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${hottub.model} ${hottub.collection} - ${t('hottub.detailTitle')} | MountSPA`} />
        <meta property="og:description" content={`${hottub.model} ${hottub.collection} - ${hottub.seating} - ${hottub.dimensions} - ${t('hottub.detailTitle')}`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={selectedShellColor?.shellIMG || ''} />
        <meta property="product:price:amount" content={hottub.price} />
        <meta property="product:price:currency" content="PLN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${hottub.model} ${hottub.collection} - ${t('hottub.detailTitle')}`} />
        <meta name="twitter:description" content={`${hottub.model} ${hottub.collection} - ${hottub.seating} - ${hottub.dimensions} - ${t('hottub.detailTitle')}`} />
        <meta name="twitter:image" content={selectedShellColor?.shellIMG || ''} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ 
          height: !isMobile ? "100%" : "auto",
          overflow: !isMobile ? "auto" : "visible" 
        }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/configurator")}
              >
                {t('hottub.moveBack')}
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                {hottub.model}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {hottub.collection} {t('hottub.collection', 'Collection')}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <HottubeImageDisplay
                model={hottub.model}
                shellImage={selectedShellColor.shellIMG}
                shellColorName={selectedShellColor.name}
                cabinetImage={selectedCabinetColor.cabinetIMG}
                cabinetColorName={selectedCabinetColor.color}
                configLink={generateShareableLink()}
              />
            </Box>
          </Box>
          
          {/* Footer for mobile - positioned under images */}
          {isMobile && (
            <Box sx={{ px: 3, mb: 3 }}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  p: 1.5,
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {/* Model info and specifications */}
                  <Box
                    sx={{
                      display: "flex", 
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1
                    }}
                  >
                    <HottubSpecChips
                      model={hottub.model}
                      collection={hottub.collection}
                      dimensions={hottub.dimensions}
                      jetCount={jetCount}
                      seating={hottub.seating}
                      size="small"
                    />
                  </Box>
                  
                  <Divider orientation="horizontal" />
                  
                  {/* Price and action buttons */}
                  <HottubPricing
                    totalPrice={calculateTotalPrice(
                      hottub, 
                      selectedWaterCareId, 
                      selectedEntertainmentId, 
                      selectedControlId, 
                      accessories, 
                      servicePackage
                    )}
                    hottub={hottub}
                    selectedWaterCareId={selectedWaterCareId}
                    selectedEntertainmentId={selectedEntertainmentId}
                    selectedControlId={selectedControlId}
                    accessories={accessories}
                    servicePackage={servicePackage}
                    onShare={handleShare}
                    onGeneratePDF={handleGeneratePDF}
                    variant="compact"
                  />
                </Box>
              </Paper>
            </Box>
          )}
          
          {/* Features section */}
          <Box sx={{ px: 3, mb: 4 }}>
            <HottubeFeatures
              seating={hottub.seating}
              dimensions={hottub.dimensions}
              jets={hottub.jets}
              watercare={hottub.watercare}
              extras={hottub.extras}
            />
          </Box>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }} sx={{ 
          p: 3, 
          backgroundColor: "#f5f5f5", 
          height: !isMobile ? "100%" : "auto", 
          overflow: !isMobile ? "auto" : "visible",
          maxHeight: !isMobile ? "calc(100vh - 64px)" : "none" // Limit height on desktop
        }}>
          <Box sx={{ 
            height: "100%", 
            overflow: !isMobile ? "auto" : "visible" 
          }}>
            <HottubeConfigOptions
              modelName={hottub.model}
              collection={hottub.collection}
              shellColors={hottub.colors.shellColors}
              cabinetColors={hottub.colors.cabinetColors}
              shellIndex={shellIndex}
              cabinetIndex={cabinetIndex}
              waterCareOptions={hottub.additionalOptions?.waterCare || []}
              entertainmentOptions={
                hottub.additionalOptions?.entertainment || []
              }
              controlOptions={hottub.additionalOptions?.control || []}
              servicePackages={availableServicePackages || []}
              selectedWaterCareId={selectedWaterCareId}
              selectedEntertainmentId={selectedEntertainmentId}
              selectedControlId={selectedControlId}
              selectedServicePackageId={servicePackage}
              accessories={accessories}
              setShellIndex={setShellIndex}
              setCabinetIndex={setCabinetIndex}
              setSelectedWaterCareId={setSelectedWaterCareId}
              setSelectedEntertainmentId={setSelectedEntertainmentId}
              setSelectedControlId={setSelectedControlId}
              handleAccessoryChange={handleAccessoryChange}
              setServicePackage={setServicePackage}
              availableAccessories={availableAccessories}
            />
            
            <Divider sx={{ my: 3 }} />

            <HottubeSummary
              modelName={hottub.model}
              collection={hottub.collection}
              shellColorName={selectedShellColor.name}
              cabinetColorName={selectedCabinetColor.color}
              seating={hottub.seating}
              waterCare={getSelectedOptionName(hottub, "waterCare", selectedWaterCareId)}
              entertainmentSystem={getSelectedOptionName(hottub, "entertainment", selectedEntertainmentId)}
              controlSystem={getSelectedOptionName(hottub, "control", selectedControlId)}
              accessories={accessories}
              servicePackage={servicePackage}
              basePrice={hottub.price}
              additionalCost={calculateAdditionalCosts(hottub, selectedWaterCareId, selectedEntertainmentId, selectedControlId, accessories, servicePackage)}
              hasLoungeSeat={hasLoungeSeat}
            />
          </Box>
        </Grid>
      </Grid>
      
      {/* Sticky footer for desktop only */}
      {!isMobile && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.palette.background.paper,
            zIndex: 1000,
            p: 1.5,
            borderRadius: 0
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left side: Model info and specifications */}
            <Box
              sx={{
                display: "flex", 
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1
              }}
            >
              <HottubSpecChips
                model={hottub.model}
                collection={hottub.collection}
                dimensions={hottub.dimensions}
                jetCount={jetCount}
                seating={hottub.seating}
              />
            </Box>
              
            {/* Right side: Price and action buttons */}
            <HottubPricing
              totalPrice={calculateTotalPrice(
                hottub, 
                selectedWaterCareId, 
                selectedEntertainmentId, 
                selectedControlId, 
                accessories, 
                servicePackage
              )}
              hottub={hottub}
              selectedWaterCareId={selectedWaterCareId}
              selectedEntertainmentId={selectedEntertainmentId}
              selectedControlId={selectedControlId}
              accessories={accessories}
              servicePackage={servicePackage}
              onShare={handleShare}
              onGeneratePDF={handleGeneratePDF}
              configLink={generateShareableLink()}
            />
          </Box>
        </Paper>
      )}

      {/* Share configuration dialog */}
      <ShareConfigurationDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        shareableLink={generateShareableLink()}
        onCopySuccess={handleCopyLinkSuccess}
        hottubModel={hottub.model}
        availableAccessories={availableAccessories}
        hottubConfig={{
          model: hottub?.model || '',
          collection: hottub?.collection || '',
          price: calculateTotalPrice(
            hottub, 
            selectedWaterCareId, 
            selectedEntertainmentId, 
            selectedControlId, 
            accessories, 
            servicePackage
          ),
          waterCareId: selectedWaterCareId,
          entertainmentId: selectedEntertainmentId,
          controlId: selectedControlId,
          accessories: accessories,
          servicePackage: servicePackage
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HottubeDetailPage;
