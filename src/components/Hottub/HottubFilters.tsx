import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Divider
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface HottubFiltersProps {
  collections: string[];
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  resultCount: number;
}

const HottubFilters = ({
  collections,
  selectedCollection,
  setSelectedCollection,
  sortOption,
  setSortOption,
  resultCount
}: HottubFiltersProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="collection-select-label">{t('configurator.filters.collection')}</InputLabel>
          <Select
            labelId="collection-select-label"
            value={selectedCollection}
            label={t('configurator.filters.collection')}
            onChange={(e) => setSelectedCollection(e.target.value as string)}
          >
            {collections.map((collection) => (
              <MenuItem key={collection} value={collection}>
                {collection}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">{t('configurator.filters.sortBy')}</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortOption}
            label={t('configurator.filters.sortBy')}
            onChange={(e) => setSortOption(e.target.value as string)}
          >
            <MenuItem value="none">{t('configurator.filters.default')}</MenuItem>
            <MenuItem value="price-low">{t('configurator.filters.priceLowHigh')}</MenuItem>
            <MenuItem value="price-high">{t('configurator.filters.priceHighLow')}</MenuItem>
            <MenuItem value="seats-low">{t('configurator.filters.seatsLowHigh')}</MenuItem>
            <MenuItem value="seats-high">{t('configurator.filters.seatsHighLow')}</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {t('configurator.resultCount', { count: resultCount })}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />
    </>
  );
};

export default HottubFilters;