import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  IconButton, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepClone } from "../../utils/helpers";

interface HottubEditorProps {
  hottub: any;
  onUpdate: (updatedHottub: any) => void;
  onDelete: () => void;
}

const HottubEditor: React.FC<HottubEditorProps> = ({ hottub, onUpdate, onDelete }) => {
  const [editedHottub, setEditedHottub] = useState<any>(null);

  useEffect(() => {
    // Deep clone to avoid direct mutation
    setEditedHottub(deepClone(hottub));
  }, [hottub]);

  if (!editedHottub) {
    return null;
  }

  // Handle basic field changes
  const handleFieldChange = (field: string, value: string) => {
    setEditedHottub({
      ...editedHottub,
      [field]: value
    });
  };

  // Handle color changes
  const handleColorChange = (type: 'shellColors' | 'cabinetColors', index: number, field: string, value: string) => {
    const updatedColors = { ...editedHottub.colors };
    updatedColors[type][index] = {
      ...updatedColors[type][index],
      [field]: value
    };

    setEditedHottub({
      ...editedHottub,
      colors: updatedColors
    });
  };

  // Add new shell color
  const addShellColor = () => {
    const newShellColor = {
      name: "New Shell Color",
      selectorColorIMG: "",
      shellIMG: ""
    };

    const updatedColors = { 
      ...editedHottub.colors,
      shellColors: [...editedHottub.colors.shellColors, newShellColor]
    };

    setEditedHottub({
      ...editedHottub,
      colors: updatedColors
    });
  };

  // Add new cabinet color
  const addCabinetColor = () => {
    const newCabinetColor = {
      color: "New Cabinet Color",
      selectorColorIMG: "",
      cabinetIMG: ""
    };

    const updatedColors = { 
      ...editedHottub.colors,
      cabinetColors: [...editedHottub.colors.cabinetColors, newCabinetColor]
    };

    setEditedHottub({
      ...editedHottub,
      colors: updatedColors
    });
  };

  // Remove shell color
  const removeShellColor = (index: number) => {
    const updatedShellColors = [...editedHottub.colors.shellColors];
    updatedShellColors.splice(index, 1);

    setEditedHottub({
      ...editedHottub,
      colors: {
        ...editedHottub.colors,
        shellColors: updatedShellColors
      }
    });
  };

  // Remove cabinet color
  const removeCabinetColor = (index: number) => {
    const updatedCabinetColors = [...editedHottub.colors.cabinetColors];
    updatedCabinetColors.splice(index, 1);

    setEditedHottub({
      ...editedHottub,
      colors: {
        ...editedHottub.colors,
        cabinetColors: updatedCabinetColors
      }
    });
  };

  // Handle extra feature change
  const handleExtraChange = (index: number, field: string, value: string) => {
    const updatedExtras = [...editedHottub.extras];
    updatedExtras[index] = {
      ...updatedExtras[index],
      [field]: value
    };

    setEditedHottub({
      ...editedHottub,
      extras: updatedExtras
    });
  };

  // Add new extra feature
  const addExtraFeature = () => {
    const newExtra = {
      name: "New Feature",
      description: "Feature description",
      value: "Feature value"
    };

    setEditedHottub({
      ...editedHottub,
      extras: [...editedHottub.extras, newExtra]
    });
  };

  // Remove extra feature
  const removeExtraFeature = (index: number) => {
    const updatedExtras = [...editedHottub.extras];
    updatedExtras.splice(index, 1);

    setEditedHottub({
      ...editedHottub,
      extras: updatedExtras
    });
  };

  // Handle additional option change
  const handleAdditionalOptionChange = (category: string, optionIndex: number, field: string, value: any) => {
    if (!editedHottub.additionalOptions) {
      // Initialize additionalOptions if it doesn't exist
      editedHottub.additionalOptions = {
        waterCare: [],
        entertainment: [],
        control: []
      };
    }

    const updatedOptions = [...(editedHottub.additionalOptions[category] || [])];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [field]: field === 'price' || field === 'isDefault' ? (typeof value === 'string' ? parseInt(value) || 0 : value) : value
    };

    setEditedHottub({
      ...editedHottub,
      additionalOptions: {
        ...editedHottub.additionalOptions,
        [category]: updatedOptions
      }
    });
  };

  // Add new additional option
  const addAdditionalOption = (category: string) => {
    if (!editedHottub.additionalOptions) {
      // Initialize additionalOptions if it doesn't exist
      editedHottub.additionalOptions = {
        waterCare: [],
        entertainment: [],
        control: []
      };
    }

    const newOption = {
      id: `${category}-${Date.now()}`,
      name: `New ${category.charAt(0).toUpperCase() + category.slice(1)} Option`,
      description: "Description of this option",
      price: 0,
      imageUrl: "",
      isDefault: false
    };

    setEditedHottub({
      ...editedHottub,
      additionalOptions: {
        ...editedHottub.additionalOptions,
        [category]: [...(editedHottub.additionalOptions[category] || []), newOption]
      }
    });
  };

  // Remove additional option
  const removeAdditionalOption = (category: string, index: number) => {
    if (!editedHottub.additionalOptions || !editedHottub.additionalOptions[category]) {
      return;
    }

    const updatedOptions = [...editedHottub.additionalOptions[category]];
    updatedOptions.splice(index, 1);

    setEditedHottub({
      ...editedHottub,
      additionalOptions: {
        ...editedHottub.additionalOptions,
        [category]: updatedOptions
      }
    });
  };

  // Save changes
  const saveChanges = () => {
    onUpdate(editedHottub);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">
          Editing: {editedHottub.model}
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            sx={{ mr: 2 }}
          >
            Delete
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxHeight: "700px", overflowY: "auto", pr: 2 }}>
        {/* Basic Info */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Basic Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Model"
                  fullWidth
                  value={editedHottub.model}
                  onChange={(e) => handleFieldChange("model", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Collection"
                  fullWidth
                  value={editedHottub.collection}
                  onChange={(e) => handleFieldChange("collection", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="ID (unique identifier)"
                  fullWidth
                  value={editedHottub.id}
                  onChange={(e) => handleFieldChange("id", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Price"
                  fullWidth
                  value={editedHottub.price}
                  onChange={(e) => handleFieldChange("price", e.target.value)}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Features */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Seating"
                  fullWidth
                  value={editedHottub.seating}
                  onChange={(e) => handleFieldChange("seating", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Dimensions"
                  fullWidth
                  value={editedHottub.dimensions}
                  onChange={(e) => handleFieldChange("dimensions", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Jets"
                  fullWidth
                  value={editedHottub.jets}
                  onChange={(e) => handleFieldChange("jets", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Water Care"
                  fullWidth
                  value={editedHottub.watercare}
                  onChange={(e) => handleFieldChange("watercare", e.target.value)}
                />
              </Grid>
              {editedHottub.usermanualURL && (
                <Grid item xs={12}>
                  <TextField
                    label="User Manual URL"
                    fullWidth
                    value={editedHottub.usermanualURL}
                    onChange={(e) => handleFieldChange("usermanualURL", e.target.value)}
                  />
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Shell Colors */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Shell Colors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={addShellColor}
              sx={{ mb: 2 }}
            >
              Add Shell Color
            </Button>
            
            {editedHottub.colors.shellColors.map((color: any, index: number) => (
              <Card key={index} sx={{ mb: 2, position: "relative" }}>
                <IconButton 
                  size="small" 
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  onClick={() => removeShellColor(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Shell Color #{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Name"
                        fullWidth
                        value={color.name}
                        onChange={(e) => handleColorChange('shellColors', index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Selector Color Image URL"
                        fullWidth
                        value={color.selectorColorIMG}
                        onChange={(e) => handleColorChange('shellColors', index, 'selectorColorIMG', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Shell Image URL"
                        fullWidth
                        value={color.shellIMG}
                        onChange={(e) => handleColorChange('shellColors', index, 'shellIMG', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Cabinet Colors */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Cabinet Colors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={addCabinetColor}
              sx={{ mb: 2 }}
            >
              Add Cabinet Color
            </Button>
            
            {editedHottub.colors.cabinetColors.map((color: any, index: number) => (
              <Card key={index} sx={{ mb: 2, position: "relative" }}>
                <IconButton 
                  size="small" 
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  onClick={() => removeCabinetColor(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Cabinet Color #{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Color Name"
                        fullWidth
                        value={color.color}
                        onChange={(e) => handleColorChange('cabinetColors', index, 'color', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Selector Color Image URL"
                        fullWidth
                        value={color.selectorColorIMG}
                        onChange={(e) => handleColorChange('cabinetColors', index, 'selectorColorIMG', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Cabinet Image URL"
                        fullWidth
                        value={color.cabinetIMG}
                        onChange={(e) => handleColorChange('cabinetColors', index, 'cabinetIMG', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Extra Features */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Extra Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={addExtraFeature}
              sx={{ mb: 2 }}
            >
              Add Extra Feature
            </Button>

            {editedHottub.extras.map((extra: any, index: number) => (
              <Card key={index} sx={{ mb: 2, position: "relative" }}>
                <IconButton 
                  size="small" 
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  onClick={() => removeExtraFeature(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Feature #{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Feature Name"
                        fullWidth
                        value={extra.name}
                        onChange={(e) => handleExtraChange(index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        value={extra.description}
                        onChange={(e) => handleExtraChange(index, 'description', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Value"
                        fullWidth
                        value={extra.value}
                        onChange={(e) => handleExtraChange(index, 'value', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Additional Options - Water Care */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Water Care Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={() => addAdditionalOption('waterCare')}
              sx={{ mb: 2 }}
            >
              Add Water Care Option
            </Button>

            {editedHottub.additionalOptions?.waterCare?.map((option: any, index: number) => (
              <Card key={index} sx={{ mb: 2, position: "relative" }}>
                <IconButton 
                  size="small" 
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  onClick={() => removeAdditionalOption('waterCare', index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Water Care Option #{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="ID"
                        fullWidth
                        value={option.id}
                        onChange={(e) => handleAdditionalOptionChange('waterCare', index, 'id', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Name"
                        fullWidth
                        value={option.name}
                        onChange={(e) => handleAdditionalOptionChange('waterCare', index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        value={option.description}
                        onChange={(e) => handleAdditionalOptionChange('waterCare', index, 'description', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Price ($)"
                        type="number"
                        fullWidth
                        value={option.price}
                        onChange={(e) => handleAdditionalOptionChange('waterCare', index, 'price', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Image URL"
                        fullWidth
                        value={option.imageUrl}
                        onChange={(e) => handleAdditionalOptionChange('waterCare', index, 'imageUrl', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        label="Default Option"
                        fullWidth
                        value={option.isDefault ? "1" : "0"}
                        onChange={(e) => handleAdditionalOptionChange('waterCare', index, 'isDefault', e.target.value === "1")}
                        SelectProps={{ native: true }}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Additional Options - Entertainment */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Entertainment Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={() => addAdditionalOption('entertainment')}
              sx={{ mb: 2 }}
            >
              Add Entertainment Option
            </Button>

            {editedHottub.additionalOptions?.entertainment?.map((option: any, index: number) => (
              <Card key={index} sx={{ mb: 2, position: "relative" }}>
                <IconButton 
                  size="small" 
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  onClick={() => removeAdditionalOption('entertainment', index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Entertainment Option #{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="ID"
                        fullWidth
                        value={option.id}
                        onChange={(e) => handleAdditionalOptionChange('entertainment', index, 'id', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Name"
                        fullWidth
                        value={option.name}
                        onChange={(e) => handleAdditionalOptionChange('entertainment', index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        value={option.description}
                        onChange={(e) => handleAdditionalOptionChange('entertainment', index, 'description', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Price ($)"
                        type="number"
                        fullWidth
                        value={option.price}
                        onChange={(e) => handleAdditionalOptionChange('entertainment', index, 'price', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Image URL"
                        fullWidth
                        value={option.imageUrl}
                        onChange={(e) => handleAdditionalOptionChange('entertainment', index, 'imageUrl', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        label="Default Option"
                        fullWidth
                        value={option.isDefault ? "1" : "0"}
                        onChange={(e) => handleAdditionalOptionChange('entertainment', index, 'isDefault', e.target.value === "1")}
                        SelectProps={{ native: true }}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Additional Options - Control */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Control Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={() => addAdditionalOption('control')}
              sx={{ mb: 2 }}
            >
              Add Control Option
            </Button>

            {editedHottub.additionalOptions?.control?.map((option: any, index: number) => (
              <Card key={index} sx={{ mb: 2, position: "relative" }}>
                <IconButton 
                  size="small" 
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  onClick={() => removeAdditionalOption('control', index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Control Option #{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="ID"
                        fullWidth
                        value={option.id}
                        onChange={(e) => handleAdditionalOptionChange('control', index, 'id', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Name"
                        fullWidth
                        value={option.name}
                        onChange={(e) => handleAdditionalOptionChange('control', index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        value={option.description}
                        onChange={(e) => handleAdditionalOptionChange('control', index, 'description', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Price ($)"
                        type="number"
                        fullWidth
                        value={option.price}
                        onChange={(e) => handleAdditionalOptionChange('control', index, 'price', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Image URL"
                        fullWidth
                        value={option.imageUrl}
                        onChange={(e) => handleAdditionalOptionChange('control', index, 'imageUrl', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        label="Default Option"
                        fullWidth
                        value={option.isDefault ? "1" : "0"}
                        onChange={(e) => handleAdditionalOptionChange('control', index, 'isDefault', e.target.value === "1")}
                        SelectProps={{ native: true }}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default HottubEditor;