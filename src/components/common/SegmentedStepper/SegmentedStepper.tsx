import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface SegmentedStepperProps {
  steps: string[];
  activeStep: number;
  title: string;
  subtitle: string;
  onBack?: () => void;
}

const SegmentedStepper = ({
  steps,
  activeStep,
  title,
  subtitle,
  onBack,
}: SegmentedStepperProps) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
        {onBack && (
          <IconButton onClick={onBack} size="small" sx={{ mr: 1 }}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box display="flex" gap={1} mb={1}>
        {steps.map((_, index) => (
          <Box
            key={index}
            flex={1}
            height={6}
            borderRadius={50}
            sx={{
              backgroundColor:
                index <= activeStep ? "primary.main" : "grey.300",
            }}
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body1">{subtitle}</Typography>
        <Typography variant="body1">
          {activeStep + 1}/{steps.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default SegmentedStepper;
