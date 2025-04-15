import { Box, IconButton } from "@mui/material";
import LinkImage from "../../atomic/Image/LinkImage";
import NavigationMenu from "./NavigationMenu";
import CloseIcon from "@mui/icons-material/Close";
import FunctionalMenu from "./FunctionalMenu";
import { LinkItem } from "../../../models/LinkItem";

interface DrawerMenuProps {
  onClose: () => void;
  links: LinkItem[];
}

const DrawerMenu = ({ onClose, links }: DrawerMenuProps) => {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Header with logo and close button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          borderBottom: "1px solid",
          borderColor: "border.main",
          pb: 1,
        }}
      >
        <LinkImage />
        <IconButton
          onClick={onClose}
          sx={{ border: "1px solid", borderRadius: "50px" }}
          size="medium"
          color="primary"
          aria-label="Close navigation menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation and functional menu sections */}
      <Box sx={{ p: 1 }}>
        <Box sx={{ mb: 2 }}>
          <NavigationMenu links={links} />
        </Box>
        <Box>
          <FunctionalMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default DrawerMenu;
