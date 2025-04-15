import { useLocation, Link as RouterLink } from "react-router";
import { Box, Breadcrumbs, Typography, Link as MUILink } from "@mui/material";

function formatValue(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography variant="body2" key={to}>
              {formatValue(value)}
            </Typography>
          ) : (
            <MUILink
              component={RouterLink}
              to={to}
              key={to}
              sx={{
                backgroundColor: "rgba(204, 250, 224, 1)",
                padding: "5px",
                borderRadius: "0px",
              }}
            >
              {formatValue(value)}
            </MUILink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default DynamicBreadcrumbs;
