import React from "react";
import { Chip } from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import WaterIcon from "@mui/icons-material/Water";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import HotTubIcon from "@mui/icons-material/HotTub";
import { formatDimensions } from "../../utils/hottubes";

interface HottubSpecChipsProps {
  model: string;
  collection: string;
  dimensions: string;
  jetCount: string;
  seating: string;
  size?: "small" | "medium";
  showModelChip?: boolean;
}

const HottubSpecChips: React.FC<HottubSpecChipsProps> = ({
  model,
  collection,
  dimensions,
  jetCount,
  seating,
  size = "medium",
  showModelChip = true,
}) => {
  return (
    <>
      {showModelChip && (
        <Chip
          icon={<HotTubIcon />}
          label={model}
          variant="outlined"
          color="primary"
          size={size}
        />
      )}
      <Chip
        icon={<CategoryIcon />}
        label={collection}
        variant="outlined"
        color="secondary"
        size={size}
      />
      <Chip
        icon={<StraightenIcon />}
        label={formatDimensions(dimensions)}
        variant="outlined"
        size={size}
      />
      <Chip
        icon={<WaterIcon />}
        label={`${jetCount} dysz`}
        variant="outlined"
        size={size}
      />
      <Chip
        icon={<PeopleIcon />}
        label={seating}
        variant="outlined"
        size={size}
      />
      
    </>
  );
};

export default HottubSpecChips;