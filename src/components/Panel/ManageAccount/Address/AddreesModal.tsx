import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { countries } from "../../../../constants/countryCodes";
import Grid from "@mui/material/Grid2"

interface AddressModalProps {
  open: boolean;
  handleClose: () => void;
  addressType: 'billing' | 'shipping';
  actionType: 'Update' | 'Add';

}

const AddressModal = ({ open, handleClose, addressType, actionType }: AddressModalProps) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuffix, setAddressSuffix] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("Italy");

  const handleSave = () => {
    console.log({ fullName, address, addressSuffix, province, country });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}  >
      <DialogContent  sx={{md:{width:"500px"}}}>
        <Typography variant="h6">{actionType} {addressType} address</Typography>
        <Box component={"form"} noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid size={{xs:12, md:6}}>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Full name
          </Typography>
          <TextField
            fullWidth
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
         
          />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
           
          />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Address Suffix
          </Typography>
          <TextField
            fullWidth
            placeholder="Address Suffix"
            value={addressSuffix}
            onChange={(e) => setAddressSuffix(e.target.value)}
           
          />
          </Grid>
          <Grid size={{xs:12, md:6}}>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Province
          </Typography>
          <TextField
            fullWidth
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          
          />

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Country
          </Typography>
          <TextField
            select
            fullWidth
            placeholder="Select country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            inputProps={{ "aria-label": "Citizenship" }}
          >
            {countries.map((option) => (
              <MenuItem key={option.code} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{ mt: 2 }}
          >
            {actionType}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            fullWidth
            sx={{ mt: 2 }}
          >
           Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
