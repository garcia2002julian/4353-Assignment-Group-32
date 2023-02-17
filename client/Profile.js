import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { stateCodes } from "./utils/StateCodes";

function StateSelect() {
  const [stateCode, setStateCode] = useState("TX");
  const handleChange = (event) => {
    setStateCode(event.target.value);
  };
  return (
    <Box sx={{ width: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stateCode}
          label="State"
          onChange={handleChange}
        >
          {Object.entries(stateCodes).map(([code, name]) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function Proflie() {
  // - Full Name (50 characters, required)
  // - Address 1 (100 characters, required)
  // - Address 2 (100 characters, optional)
  // - City (100 characters, required)
  // - State (Drop Down, selection required) DB will store 2 character state code
  // - Zipcode (9 characters, at least 5 character code required)


  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          disabled
          label="Username"
          defaultValue="bobRandomUser"
          variant="standard"
        />

        <TextField label="First Name" defaultValue="" variant="standard" />

        <TextField label="Last Name" defaultValue="" variant="standard" />

        <TextField label="Address 1" defaultValue="" variant="standard" />
        <TextField
          label="Address 2 (Optional)"
          defaultValue=""
          variant="standard"
        />

        <TextField label="City" defaultValue="" variant="standard" />

        <StateSelect o />
      </Box>
    </div>
  );
}

export default Proflie;
