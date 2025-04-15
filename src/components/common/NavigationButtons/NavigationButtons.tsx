import { Box, Button, useMediaQuery } from "@mui/material";

export interface NavigationConfig {
  nextLabel: string;
  skipLabel?: string;
  backLabel?: string;
  disableBack?: boolean;
  disableNext?: boolean;
  hideSkip?: boolean;
  hideBack?: boolean;
}

export interface NavigationButtonsProps {
  onBack: () => void;
  onSkip: () => void;
  onNext: () => void;
  config: NavigationConfig;
}

const NavigationButtons = ({
  onBack,
  onSkip,
  onNext,
  config,
}: NavigationButtonsProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const fullWidthProps = isMobile ? { fullWidth: true } : {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? undefined : "flex-end",
        gap: 1,
      }}
    >
      {!config.hideBack && (
        <Button
          variant="outlined"
          {...fullWidthProps}
          onClick={onBack}
          disabled={config.disableBack}
        >
          {config.backLabel || "Back"}
        </Button>
      )}
      {!config.hideSkip && (
        <Button
          variant="text"
          {...fullWidthProps}
          onClick={onSkip}
        >
          {config.skipLabel || "Skip"}
        </Button>
      )}
      <Button
        variant="contained"
        {...fullWidthProps}
        onClick={onNext}
        disabled={config.disableNext}
      >
        {config.nextLabel}
      </Button>
    </Box>
  );
};

export default NavigationButtons;
