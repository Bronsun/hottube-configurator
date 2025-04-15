import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const UploadDocuments = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Upload Document</Typography>
                <input type="file" onChange={handleFileChange} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile}
                >
                    Upload
                </Button>
            </CardContent>
        </Card>
    );
};

export default UploadDocuments;