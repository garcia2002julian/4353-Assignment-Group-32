import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { flexbox } from "@mui/system";

export default function Quota() {
  // - Gallons Requested (numeric, required)
  // - Delivery Address (Non-editable, comes from client profile)
  // - Delivery Date (Calender, date picker)
  // - Suggested Price / gallon (numeric non-editable, price will be calculated by Pricing Module -
  //   we are not building pricing module yet)
  // - Total Amount Due (numeric non-editable, calculated (gallons * price))

  const [value, setValue] = React.useState(dayjs());
  const [GallonRequested, setGallonRequested] = useState("");

  const [logInStatus, setLoginStatus] = useState("");

  const [userInfo, setUserInfo] = useState(null);

  const [sumbitButton, setSubmit] = useState(false)

  const isDisabled = !(GallonRequested && value );
  const issumbitDisabled = !(sumbitButton && GallonRequested && value)
  
  const [suggestAmount, setSuggestAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");


  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:3001/getUserInfo");
  //     const data = await response.json();
  //     setUserInfo(data)
  //   };

  //   fetchData();
  // }, []);

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch("http://localhost:3001/getUserInfo");
      const data = await response.json();
      setUserInfo(data)
    };

    fetchData();
  }, []);

  if(!userInfo){
    return <p>Loading...</p>;
  }
  

  const getSuggestedPrice = () => {
    // need gallon requested, Delivery Address TX or Texas is valid any other state will use a different variable.
    //Suggested Price = Current Price + Margin
    // Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
    //Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
    //Location Factor = 2% for Texas, 4% for out of state.
    //Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
    //Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
    //Company Profit Factor = 10% always

    //1.
    // axios.get("http://localhost:3001/getUserInfo").then((response)=>{

    //   setUserInfo(response.data)
    // });
    // console.log(userInfo)

    if (userInfo.state == "TX" || userInfo.state == "Texas") {
      var locationFactor = 0.02;
    } else {
      var locationFactor = 0.04;
    }
    //---------------------------/
    if (userInfo.newuser == 1) {
      //Regular user
      var rateHistoryFactor = 0.01;
    } else {
      var rateHistoryFactor = 0.0;
    }
    //-----------------------------/
    if (GallonRequested > 1000) {
      var gallonsReqFactor = 0.02;
    } else {
      var gallonsReqFactor = 0.03;
    }
    var companyProfitFactor = 0.1;
    var currentPrice = 1.50;
    var margin =
      currentPrice *
      (locationFactor -
        rateHistoryFactor +
        gallonsReqFactor +
        companyProfitFactor);
    var suggestedPrice = currentPrice + margin;
    var ta = GallonRequested * suggestedPrice;
    setSuggestAmount(suggestedPrice)
    setTotalAmount(ta)
    //console.log('(',locationFactor, '-', rateHistoryFactor, '+', gallonsReqFactor, '+', companyProfitFactor, ')','*',currentPrice)
    //console.log(GallonRequested , '*' , suggestedPrice)
    setSubmit(true)
    console.log(value['$d'])
  };


  const submitQuota= ()=>{
    axios
      .post("http://localhost:3001/submitQuota", {
        gallon_req: GallonRequested,
        delivery_add: userInfo['address 1'],
        date: value['$d'],
        suggest_p: suggestAmount,
        total_amount: totalAmount
      })
      .then((response) => {
        // if (response.data.message) {
        //   setLoginStatus(response.data.message);
        // } else {
        //   setLoginStatus(response.data[0].username);
        // }
        console.log(response.data);
      });
    
    




  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Button variant="contained" color="primary" href="/home">
        Go back
      </Button>
      
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "400px" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "auto",
          p: "10px",
          m: "15vh auto", // set horizontal margin to auto
          bgcolor: "white",
          borderRadius: 1,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          InputLabelProps={{ required: false }}
          required
          id="outlined-required"
          label="Gallon Requested"
          defaultValue=""
          type="number"
          onChange={(event) => {
            setGallonRequested(event.target.value);
            setSubmit(false)
          }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Delivery Address"
          variant="filled"
          defaultValue={userInfo['address 1']}
        />
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          disabled
          id="suggested-price"
          label={totalAmount && suggestAmount  ? suggestAmount : "Suggested Price"}
          defaultValue=""
          variant="filled"
        />
        <TextField
          disabled
          id="amount-due"
          label={totalAmount && suggestAmount  ? totalAmount : "Amount Due"}
          defaultValue= ""
          variant="filled"
        />

        <Button variant="outlined" onClick={getSuggestedPrice} disabled={isDisabled}>
          Get Suggested Price
        </Button>
        <Button variant="outlined" sx={{ marginTop: "1em" }} disabled={issumbitDisabled} onClick={submitQuota}>
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
