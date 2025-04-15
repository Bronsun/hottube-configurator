import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import DownloadIcon from "@mui/icons-material/Download";
import { Card } from '@mui/material';

const dummyData = [
    { id: 1, document: 'Document 1', type: 'PDF' },
    { id: 2, document: 'Document 2', type: 'Word' },
    { id: 3, document: 'Document 3', type: 'Excel' },
];

const DocumentsTable = () => {
    return (
        <Card>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>Documents</TableCell>
                        <TableCell align="right">Type of the file</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <IconButton>
                                    <DownloadIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>{row.document}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Card>
    );
};

export default DocumentsTable;