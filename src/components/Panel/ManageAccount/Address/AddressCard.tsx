import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";

interface AddressCardProps {
  fullName:string,
  address:string,
  addreesSuffix:string,
  province: string,
  country: string,
  onDelete: ()=> void,
  onEdit: () => void,
}


const AddressCard = ({
  fullName,
  address,
  addreesSuffix,
  province,
  country,
  onDelete,
  onEdit,
}:AddressCardProps) => {

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
            <TableCell>Full name:</TableCell>
            <TableCell>{fullName}</TableCell>
              </TableRow>
              <TableRow>
            <TableCell>Address:</TableCell>
            <TableCell>{address}</TableCell>
              </TableRow>
              <TableRow>
            <TableCell>Address suffix:</TableCell>
            <TableCell>{addreesSuffix}</TableCell>
              </TableRow>
              <TableRow>
            <TableCell>Province:</TableCell>
            <TableCell>{province}</TableCell>
              </TableRow>
              <TableRow>
            <TableCell>Country:</TableCell>
            <TableCell>{country}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="text" color="error" sx={{ mr: 1 }} onClick={onDelete}>
            Delete
          </Button>
          <Button variant="text" color="primary" onClick={onEdit}>
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
