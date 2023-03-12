import React from "react";
import { historyTempData } from "./data/HistoryTempData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';


function HistoryTable() {
    const tempData = historyTempData

  return (
    <Box>
      
    {/* <Button variant="contained" color="primary" href="/profile">Profile</Button> */}

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
        <TableRow>

          <TableCell>Date</TableCell>
          <TableCell align="right">Gallons Requested</TableCell>
          <TableCell align="right">Delivery Address</TableCell>
          <TableCell align="right">Delivery Date</TableCell>
          <TableCell align="right">Suggested Price</TableCell>
          <TableCell align="right">Total Amount Due</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {tempData.map((i)=>(
                <TableRow key = {i.Id}>
                    <TableCell component="th" scope="row">{i["Date"]}</TableCell>
                    <TableCell align="right">{i["Gallons Requested"]}</TableCell>
                    <TableCell align="right">{i["Delivery Address"]}</TableCell>
                    <TableCell align="right">{i["Delivery Date"]}</TableCell>
                    <TableCell align="right">{i["Suggested Price"]}</TableCell>
                    <TableCell align="right">{i["Total Amount Due"]}</TableCell>   
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

function History() {
  // - Gallons Requested (numeric, required)
  // - Delivery Address (Non-editable, comes from client profile)
  // - Delivery Date (Calender, date picker)
  // - Suggested Price / gallon (numeric non-editable, price will be calculated by Pricing Module -
  //   we are not building pricing module yet)
  // - Total Amount Due (numeric non-editable, calculated (gallons * price))

  const data = historyTempData;

  return (
    <div>
      <Button variant="contained" color="primary" href="/home">Go back</Button>
      <HistoryTable />
    </div>
  );
}

export default History;
