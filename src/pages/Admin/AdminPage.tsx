import { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 

  CircularProgress,
  Snackbar, 
  Alert,
  Divider
} from "@mui/material";
import { useHottubes } from "../../utils/hottubes";
import HottubEditor from "../../components/Admin/HottubEditor";

const AdminPage = () => {
  const { hottubes: originalHottubes, loading } = useHottubes();
  const [hottubes, setHottubes] = useState<any[]>([]);
  const [selectedHottubIndex, setSelectedHottubIndex] = useState<number | null>(null);
  const [jsonOutput, setJsonOutput] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  // Initialize hottubes from the fetched data
  useEffect(() => {
    if (originalHottubes && originalHottubes.length > 0) {
      setHottubes([...originalHottubes]);
      // Select the first hottub by default
      setSelectedHottubIndex(0);
      
      // Generate initial JSON output
      generateJsonOutput([...originalHottubes]);
    }
  }, [originalHottubes]);

  // Function to handle selecting a hottub for editing
  const handleSelectHottub = (index: number) => {
    setSelectedHottubIndex(index);
  };

  // Function to add a new hottub
  const handleAddHottub = () => {
    const newHottub = {
      id: `new-hottub-${Date.now()}`,
      collection: "New Collection",
      model: "New Model",
      price: "$0",
      colors: {
        cabinetColors: [
          {
            color: "New Cabinet Color",
            selectorColorIMG: "",
            cabinetIMG: ""
          }
        ],
        shellColors: [
          {
            name: "New Shell Color",
            selectorColorIMG: "",
            shellIMG: ""
          }
        ]
      },
      additionalOptions: {
        waterCare: [
          {
            id: "standard",
            name: "Standard Chemicals",
            description: "Basic chemical water treatment system",
            price: 0,
            imageUrl: "",
            isDefault: true
          },
          {
            id: "freshwater",
            name: "FreshWater® Salt System",
            description: "Advanced salt-based water care system",
            price: 500,
            imageUrl: "",
            isDefault: false
          }
        ],
        entertainment: [
          {
            id: "none",
            name: "No Audio System",
            description: "No audio system included",
            price: 0,
            imageUrl: "",
            isDefault: true
          },
          {
            id: "bluetooth",
            name: "Wireless Audio System",
            description: "Bluetooth-enabled sound system",
            price: 900,
            imageUrl: "",
            isDefault: false
          }
        ],
        control: [
          {
            id: "standard",
            name: "Standard Controls",
            description: "Standard hot tub controls",
            price: 0,
            imageUrl: "",
            isDefault: true
          },
          {
            id: "smart",
            name: "Online Spa Control",
            description: "Smart phone app control system",
            price: 350,
            imageUrl: "",
            isDefault: false
          }
        ]
      },
      seating: "0 Adults",
      dimensions: "0' x 0' x 0\"",
      jets: "0 jets",
      watercare: "Standard",
      extras: []
    };

    const updatedHottubes = [...hottubes, newHottub];
    setHottubes(updatedHottubes);
    setSelectedHottubIndex(updatedHottubes.length - 1);
    generateJsonOutput(updatedHottubes);
    
    setSnackbar({
      open: true,
      message: "New hot tub added. Don't forget to save your changes!",
      severity: "success"
    });
  };

  // Function to update a hottub
  const handleUpdateHottub = (updatedHottub: any, index: number) => {
    const updatedHottubes = [...hottubes];
    updatedHottubes[index] = updatedHottub;
    setHottubes(updatedHottubes);
    generateJsonOutput(updatedHottubes);
    
    setSnackbar({
      open: true,
      message: "Hot tub updated!",
      severity: "success"
    });
  };

  // Function to delete a hottub
  const handleDeleteHottub = (index: number) => {
    if (confirm("Are you sure you want to delete this hot tub?")) {
      const updatedHottubes = [...hottubes];
      updatedHottubes.splice(index, 1);
      setHottubes(updatedHottubes);
      
      // If we deleted the selected hottub, select the first one
      if (selectedHottubIndex === index) {
        setSelectedHottubIndex(updatedHottubes.length > 0 ? 0 : null);
      }
      // If we deleted a hottub before the selected one, adjust the index
      else if (selectedHottubIndex !== null && index < selectedHottubIndex) {
        setSelectedHottubIndex(selectedHottubIndex - 1);
      }
      
      generateJsonOutput(updatedHottubes);
      
      setSnackbar({
        open: true,
        message: "Hot tub deleted!",
        severity: "success"
      });
    }
  };

  // Generate formatted JSON output
  const generateJsonOutput = (hottubsData: any[]) => {
    const jsonData = { hottubes: hottubsData };
    setJsonOutput(JSON.stringify(jsonData, null, 2));
    handleSaveJson();
  };



  // Function to handle saving the JSON to file
  const handleSaveJson = async () => {
    try {
      // First save to localStorage for persistence
      localStorage.setItem("hottubsData", jsonOutput);
      
      // Generate a file for download
      const blob = new Blob([jsonOutput], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      a.download = `hottubs-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

     
    } catch (error) {
      console.error("Error saving JSON:", error);
      setSnackbar({
        open: true,
        message: "Error saving JSON. Please try again.",
        severity: "error"
      });
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Hot Tub Administrator
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Manage hot tub configurations and generate updated JSON
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        {/* Left side - Hot tub selector */}
        <Paper sx={{ width: "25%", p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Hot Tubs
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleAddHottub}
            sx={{ mb: 2 }}
          >
            Add New Hot Tub
          </Button>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
            {hottubes.map((hottub, index) => (
              <Button
                key={hottub.id}
                fullWidth
                variant={selectedHottubIndex === index ? "contained" : "outlined"}
                color={selectedHottubIndex === index ? "secondary" : "primary"}
                onClick={() => handleSelectHottub(index)}
                sx={{ mb: 1, justifyContent: "flex-start" }}
              >
                {hottub.model} ({hottub.collection})
              </Button>
            ))}
          </Box>
        </Paper>

        {/* Center - Hot tub editor */}
        <Paper sx={{ width: "75%", p: 2 }}>
          {selectedHottubIndex !== null && hottubes[selectedHottubIndex] ? (
            <HottubEditor 
              hottub={hottubes[selectedHottubIndex]} 
              onUpdate={(updatedHottub) => handleUpdateHottub(updatedHottub, selectedHottubIndex)}
              onDelete={() => handleDeleteHottub(selectedHottubIndex)}
            />
          ) : (
            <Typography variant="body1">
              Select a hot tub from the list or add a new one.
            </Typography>
          )}
        </Paper>

        {/* Right side - JSON output */}
       
      </Box>

      {/* Notification snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPage;