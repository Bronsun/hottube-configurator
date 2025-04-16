import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import {
  sortHottubsByPrice,
  sortHottubsBySeating,
  useHottubes
} from "../../utils/hottubes";
import HottubCard from "../../components/Hottub/HottubCard";
import HottubFilters from "../../components/Hottub/HottubFilters";
import { useTranslation } from "react-i18next";

const ConfiguratorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hottubes, loading, error } = useHottubes();
  const [selectedCollection, setSelectedCollection] = useState<string>("All");
  const [, setFilteredHottubes] = useState(hottubes);
  const [sortOption, setSortOption] = useState<string>("none");
  const [displayedHottubes, setDisplayedHottubes] = useState(hottubes);

  // State to track selected colors for each hottub
  const [selectedColors, setSelectedColors] = useState<
    Record<string, { shellIndex: number; cabinetIndex: number }>
  >({});

  // Initialize default color selections (first color of each type)
  useEffect(() => {
    if (hottubes.length > 0) {
      const initialColors: Record<
        string,
        { shellIndex: number; cabinetIndex: number }
      > = {};
      hottubes.forEach((hottub) => {
        initialColors[hottub.id] = { shellIndex: 0, cabinetIndex: 0 };
      });
      setSelectedColors(initialColors);
    }
  }, [hottubes]);

  // Get unique collections for the filter dropdown
  const collections = [
    "All",
    ...new Set(hottubes.map((hottub) => hottub.collection)),
  ];

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    // First apply collection filter
    let result =
      selectedCollection === "All"
        ? hottubes
        : hottubes.filter((hottub) => hottub.collection === selectedCollection);

    // Then apply sorting
    switch (sortOption) {
      case "price-low":
        result = sortHottubsByPrice(result, true);
        break;
      case "price-high":
        result = sortHottubsByPrice(result, false);
        break;
      case "seats-low":
        result = sortHottubsBySeating(result, true);
        break;
      case "seats-high":
        result = sortHottubsBySeating(result, false);
        break;
      default:
      // No sorting
    }

    setFilteredHottubes(result);
    setDisplayedHottubes(result);
  }, [selectedCollection, sortOption, hottubes]);

  // Handler for color selection changes
  const handleColorChange = (
    hottubId: string,
    colorType: "shell" | "cabinet",
    index: number
  ) => {
    setSelectedColors((prev) => ({
      ...prev,
      [hottubId]: {
        ...prev[hottubId],
        [colorType === "shell" ? "shellIndex" : "cabinetIndex"]: index,
      },
    }));
  };

  // Handler for navigating to the detail configuration page
  const handleConfigureHottub = (hottubId: string) => {
    const hottubColors = selectedColors[hottubId] || {
      shellIndex: 0,
      cabinetIndex: 0,
    };
    navigate(`/configurator/${hottubId}`, {
      state: {
        shellIndex: hottubColors.shellIndex,
        cabinetIndex: hottubColors.cabinetIndex,
      },
    });
  };

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Helmet>
          <title>{t('configurator.title')} | MountSPA</title>
          <meta name="description" content={t('configurator.subtitle')} />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content={`${t('configurator.title')} | MountSPA`} />
          <meta property="og:description" content={t('configurator.subtitle')} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={`${t('configurator.title')} | MountSPA`} />
          <meta name="twitter:description" content={t('configurator.subtitle')} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>{t('common.loading')}</Typography>
        </Box>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxWidth="lg">
        <Helmet>
          <title>{t('configurator.title')} | MountSPA</title>
          <meta name="description" content={t('configurator.subtitle')} />
        </Helmet>
        <Box sx={{ my: 4 }}>
          <Alert severity="error">
            {t('common.error')}: {error.message}
          </Alert>
        </Box>
      </Container>
    );
  }

  // Prepare SEO meta description based on available collections
  const collectionsList = collections.filter(c => c !== 'All').join(', ');
  const metaDescription = `${t('configurator.subtitle')} ${displayedHottubes.length} ${t('configurator.resultCount', { count: displayedHottubes.length })} ${collectionsList}`;

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>{t('configurator.title')} | MountSPA</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`hot tub, spa, jacuzzi, ${collectionsList}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${t('configurator.title')} | MountSPA`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/assets/MountSpa-logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${t('configurator.title')} | MountSPA`} />
        <meta name="twitter:description" content={metaDescription} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('configurator.title')}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {t('configurator.subtitle')}
        </Typography>

        {/* Filters and Sorting */}
        <HottubFilters 
          collections={collections}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          sortOption={sortOption}
          setSortOption={setSortOption}
          resultCount={displayedHottubes.length}
        />

        {/* Hottubs Grid */}
        <Grid container spacing={4}>
          {displayedHottubes.map((hottub) => {
            // Get the currently selected colors for this hottub
            const hottubColors = selectedColors[hottub.id] || {
              shellIndex: 0,
              cabinetIndex: 0,
            };
            const shellColor =
              hottub.colors.shellColors[hottubColors.shellIndex];
            const cabinetColor =
              hottub.colors.cabinetColors[hottubColors.cabinetIndex];

            return (
              <Grid item key={hottub.id} xs={12} sm={6} md={4}>
                <HottubCard 
                  hottub={hottub}
                  shellColor={shellColor}
                  cabinetColor={cabinetColor}
                  shellIndex={hottubColors.shellIndex}
                  cabinetIndex={hottubColors.cabinetIndex}
                  onColorChange={handleColorChange}
                  onConfigure={handleConfigureHottub}
                />
              </Grid>
            );
          })}
        </Grid>

        {displayedHottubes.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6">
              {t('configurator.noHotTubs')}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ConfiguratorPage;
