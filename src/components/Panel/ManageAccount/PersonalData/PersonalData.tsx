import { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { countries } from '../../../../constants/countryCodes';

const PersonalData = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [country, setCountry] = useState('Italy');
    const [postalCode, setPostalCode] = useState('');
    const [birthday, setBirthday] = useState('');
    const [taxId, setTaxId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    return (
        <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box mb={1}>
              <Typography variant="subtitle2">Name</Typography>
            </Box>
            <TextField
              placeholder="Enter your name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">Last Name</Typography>
            </Box>
            <TextField
              fullWidth
              required
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">Citizenship</Typography>
            </Box>
            <TextField
              select
              fullWidth
              placeholder="Select citizenship"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
            >
              {countries.map((option) => (
                <MenuItem key={option.code} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">Country</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">Postal Code</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box mb={1}>
              <Typography variant="subtitle2">Birthday</Typography>
            </Box>
            <TextField
              type="date"
              fullWidth
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">
                Tax Identification Number
              </Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter your Tax ID"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">Address</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2">City</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{mt:2}}>
            Save
          </Button>
      </Box>
   
    );
};

export default PersonalData;
