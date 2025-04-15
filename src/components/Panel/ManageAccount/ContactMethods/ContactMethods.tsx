import React, { useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';

const ContactMethods = () => {
    const [mode, setMode] = useState('email');
    const [value, setValue] = useState('');

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode((event.target as HTMLInputElement).value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSave = () => {
        console.log(`Saved ${mode}: ${value}`);
    };

    return (
        <Box>
            <Typography variant="body1">Choose the contact method</Typography>
            <RadioGroup value={mode} onChange={handleModeChange}>
                <FormControlLabel value="email" control={<Radio />} label="Email" />
                <FormControlLabel value="phone" control={<Radio />} label="Phone" />
            </RadioGroup>
            <Box sx={{ mt: 2 }}>
                <TextField
                    value={value}
                    placeholder={mode === "email" ? "Email" : "Phone"}
                    onChange={handleValueChange}
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
            >
                Save
            </Button>
        </Box>
    );
};

export default ContactMethods;