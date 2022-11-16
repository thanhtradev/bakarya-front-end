import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(Address, Item, Phone, status, UserID, UpdatedAt) {
  return { Address, Item, Phone, status, UserID, UpdatedAt };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ViewOrder = () => {
  useEffect(() => {
    fetchOrder();
  }, []);
  const fetchOrder = () => {
    var config = {
      method: "get",
      url: "http://api.bakarya.com/api/order",
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2U4ZjUwMjY3ODJlNTVhOTBmYzg1YiIsImlhdCI6MTY2ODQ0MDA5OSwiZXhwIjoxNjk5OTc2MDk5fQ.B_u0SeC9NIrVWuXZutaInVO-TIIUwA3O2B17cnxZdfA",
      },
    };

    axios(config)
      .then(function (response) {
        // row.push(createData())
        // const
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>Address</TableCell>
            <TableCell align='right'>Item</TableCell>
            <TableCell align='right'>Phone</TableCell>
            <TableCell align='right'>status</TableCell>
            <TableCell align='right'>UserID</TableCell>
            <TableCell align='right'>UpdatedAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewOrder;
