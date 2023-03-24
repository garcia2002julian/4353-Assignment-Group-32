import React from "react";
import { useState, useEffect } from "react";

import { historyTempData } from "./data/HistoryTempData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "./Auth";
function HistoryTable() {
  const [userHistory, setuserHistory] = useState(null);
  const [userinfo, setuserinfo] = useState(null);

  const auth = useAuth()
  //use effect to get info at start
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch(`http://localhost:3001/getHistoryOfUser/${auth.user}`);
      const response2 = await fetch(`http://localhost:3001/getUserInfo/${auth.user}`);

      const data = await response.json();
      const data2 = await response2.json();
      setuserinfo(data2)
      setuserHistory(data)
      console.log(data2)
    };

    fetchData();
  }, []);

  if(!userHistory || userinfo[0].newuser == 1){
    return <p>Loading...</p>;
  }
  
  const clickmeDebugging = ()=>{
    console.log(userHistory)
  }

  return (
    <Box>
      {/* <Button variant="contained" color="primary" href="/profile">Profile</Button> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Gallons Requested</TableCell>
              <TableCell align="right">Delivery Address</TableCell>
              <TableCell align="right">Delivery Date</TableCell>
              <TableCell align="right">Suggested Price</TableCell>
              <TableCell align="right">Total Amount Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userHistory.map((i) => (
              
              <TableRow key={i.Id}>
                <TableCell align="right">{i["gallonsrequested"]}</TableCell>
                <TableCell align="right">{i["deliveryaddress"]}</TableCell>
                <TableCell align="right">{i["deliverydate"]}</TableCell>
                <TableCell align="right">{i["suggestedprice"]}</TableCell>
                <TableCell align="right">{i["totalamountdue"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <button onClick={clickmeDebugging}>
        Debug
      </button> */}
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
      {/* <Button variant="contained" color="primary" href="/home">
        Go back
      </Button> */}
      <HistoryTable />
    </div>
  );
}

export default History;
