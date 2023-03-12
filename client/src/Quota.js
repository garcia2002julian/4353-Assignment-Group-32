import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { flexbox } from '@mui/system';

export default function Quota() {

  // - Gallons Requested (numeric, required)
	// - Delivery Address (Non-editable, comes from client profile)
	// - Delivery Date (Calender, date picker)
	// - Suggested Price / gallon (numeric non-editable, price will be calculated by Pricing Module - 
  //   we are not building pricing module yet)
	// - Total Amount Due (numeric non-editable, calculated (gallons * price))

  const [value, setValue] = React.useState(dayjs());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterMoment}>
     <Button variant="contained" color="primary" href="/home">Go back</Button>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "400px" },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 'auto',
          p: '10px',
          m: '15vh auto', // set horizontal margin to auto
          bgcolor: 'red',
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
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Delivery Address"
            variant="filled"
            defaultValue=""
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
            label="Suggested Price"
            defaultValue=""
            variant="filled"
          />
          <TextField
            disabled
            id="amount-due"
            label="Total Amount Due"
            defaultValue=""
            variant="filled"
          />

        <Button variant="outlined">Get Suggested Price</Button>
        <Button variant="outlined" sx = {{marginTop: "1em"}}>Submit</Button>

      </Box>
    </LocalizationProvider>
  );
}
