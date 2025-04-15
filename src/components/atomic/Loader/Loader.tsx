import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
}

const Loader= ({ message = "Loading..." }:LoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 2,
      }}
    >
      <CircularProgress />
      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
