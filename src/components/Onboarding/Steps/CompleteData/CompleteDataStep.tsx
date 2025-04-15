import { useEffect, useState } from "react";
import { Box, TextField, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { countries } from "../../../../constants/countryCodes";
import { NavigationConfig } from "../../../common/NavigationButtons/NavigationButtons";

interface CompleteDataStepProps {
  setNavConfig: (config: NavigationConfig) => void;
}

const CompleteDataStep = ({ setNavConfig }: CompleteDataStepProps) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [citizenship, setCitizenship] = useState("Italy");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Set navigation configuration on component mount
  useEffect(() => {
    setNavConfig({
      nextLabel: "Next",
      hideBack: true,
      disableNext: false,
      hideSkip: true,
    });
  }, [setNavConfig]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        {/* Left Column */}
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
            inputProps={{ "aria-label": "Name", "aria-required": "true" }}
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
            inputProps={{ "aria-label": "Last Name", "aria-required": "true" }}
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
            inputProps={{ "aria-label": "Citizenship" }}
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
            inputProps={{ "aria-label": "Country" }}
          />
          <Box mt={2} mb={1}>
            <Typography variant="subtitle2">Postal Code</Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            inputProps={{ "aria-label": "Postal Code" }}
          />
        </Grid>
        {/* Right Column */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box mb={1}>
            <Typography variant="subtitle2">Birthday</Typography>
          </Box>
          <TextField
            type="date"
            fullWidth
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            inputProps={{ "aria-label": "Birthday" }}
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
            inputProps={{ "aria-label": "Tax Identification Number" }}
          />
          <Box mt={2} mb={1}>
            <Typography variant="subtitle2">Address</Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            inputProps={{ "aria-label": "Address" }}
          />
          <Box mt={2} mb={1}>
            <Typography variant="subtitle2">City</Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            inputProps={{ "aria-label": "City" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompleteDataStep;
