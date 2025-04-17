import { Box, Button } from "@mui/material";
import { useState } from "react";
import EmailFormModal from "./EmailFormModal";

interface HottubeImageDisplayProps {
  model: string;
  shellImage: string;
  shellColorName: string;
  cabinetImage: string;
  cabinetColorName: string;
}

const HottubeImageDisplay = ({
  model,
  shellImage,
  shellColorName,
  cabinetImage,
  cabinetColorName,
}: HottubeImageDisplayProps) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  
  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true);
  };
  
  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };
  
  const handleEmailSuccess = () => {
    // You can add any actions to take after a successful email submission
    // For example, redirect to the PDF or show a success message
    window.open("https://mountspa.pl/wp-content/uploads/2025/04/caldera-catalog-mountspa.pdf", "_blank");
  };

  return (
    <Box
      sx={{
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        display: "flex",
        width: "100%",
        margin: "0 auto", // Center the container horizontally
      }}
    >
      <Box
        component="img"
        sx={{
          objectFit: "contain",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "100%",
          margin: "0 auto", // Center image horizontally
        }}
        src={shellImage}
        alt={`${model} shell - ${shellColorName}`}
      />
      
      {/* Cabinet image with shadow effect for floating appearance */}
      <Box sx={{ 
        position: "relative", 
        maxWidth: "100%",
        margin: "0 auto",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "10%",
          width: "80%",
          height: 20,
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.2)",
          filter: "blur(8px)",
          zIndex: 0
        }
      }}>
        <Box
          component="img"
          sx={{
            objectFit: "contain",
            zIndex: 1,
            position: "relative",
            maxWidth: "100%",
            margin: "0 auto", // Center image horizontally
          }}
          src={cabinetImage}
          alt={`${model} cabinet - ${cabinetColorName}`}
        />
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Button 
            variant="outlined"  
            href="https://omnisightinc.com/virtual-tours/watkins-wellness/caldera-spas-showroom-virtual-tour/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ m: 1 }}
        >
          Spacer wirtualny 360°
        </Button>
        <Button 
            variant="contained"  
            onClick={handleOpenEmailModal}
            sx={{ m: 1 }}
        >
         Katalog PDF
        </Button>
      </Box>
      <Box sx={{mt:2}}>
     
      </Box>
      
      {/* Email Modal */}
      <EmailFormModal
        open={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        onSuccess={handleEmailSuccess}
        hottubModel={model}
      />
    </Box>
  );
};

export default HottubeImageDisplay;
