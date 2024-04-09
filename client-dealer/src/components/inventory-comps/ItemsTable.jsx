import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  TextField,
  Box,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import { InventoryStyles } from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";

//reducers
import { handleSelectRow } from "../../redux/features/inventory";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "large",
  color: "white",
  [theme.breakpoints.down("md")]: {
    fontSize: "small",
    padding: "0.3rem 0",
  },
}));

const TableItem = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  fontSize: "large",
  [theme.breakpoints.down("md")]: {
    fontSize: "small",
    padding: "0.3rem 0",
  },
}));

const ItemsTable = ({ products }) => {
  const dispatch = useDispatch();

  return (
    <TableContainer sx={InventoryStyles.Items}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "dodgerblue",
          }}
        >
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell sx={{ width: "15%" }}>ID</StyledTableCell>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product, i) => (
            <TableRow
              key={product._id}
              sx={i % 2 != 0 ? InventoryStyles.Alternate : ""}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={() => dispatch(handleSelectRow(product._id))}
                />
              </TableCell>
              <TableItem>{product._id.slice(-5)}</TableItem>
              <TableItem>
                <Stack
                  direction="row"
                  gap="1rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src={product.image}
                    sx={{
                      height: { xs: "3rem", md: "5rem" },
                      width: { xs: "3rem", md: "5rem" },
                    }}
                  ></Box>
                  <>{product.name}</>
                </Stack>
              </TableItem>
              <TableItem>₹ {product.price}</TableItem>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
