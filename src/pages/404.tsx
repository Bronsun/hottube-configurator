import { Box } from "@mui/material";
import StatusComponent from "../components/common/Status/StatusComponent";
import { ROUTES } from "../constants/routes";

const NotFound = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <StatusComponent
      variant="danger"
      title="An error has occured"
      message="404 Page not found"
      buttonText="Go back to dashboard"
      href={ROUTES.PANEL}
      />
    </Box>
  );
};

export default NotFound;
