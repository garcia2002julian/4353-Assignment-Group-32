import Navbar from "./Components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

// var Name = "NAME";
// var Address1 = "Address1";
// var Address2 = "Address2";
// var City = "City";
// var State = "State";
// var Zipcode = "zipcode";

export default function Profile() {
  const [showForm, setShowForm] = useState(false);

  const ShowForm = () => {
    setShowForm(!showForm);
    console.log(showForm);
  };

  // using this when getting into the backend

  //   useEffect(async () => {
  //     const data = await axios.get("http://localhost:3001/register");
  //     setResponseData(data);
  //   }, []);

  //const [responseData, setResponseData] = useState();

  const [Name, setName] = useState("Name");
  const [Address1, setAddress1] = useState("Address1");
  const [Address2, setAddress2] = useState("Address2");
  const [City, setCity] = useState("City");
  const [State, setState] = useState("State");
  const [Zipcode, setZipcode] = useState("Zipcode");

  const handleSubmit = (e) => {
    //backend stuff
    // setResponseData({
    //   name: Name,
    // });
    // axios.post("http://localhost:3001/register", responseData);
  };

  return (
    <div className="container-Profile">
      <Navbar />
      <div className="profileImage-container"></div>
      <div className="profileInformation-container">
        <div className="Name-container">Name: {Name} </div>
        <div className="Address-container">
          <div className="Address1-container">Address1: {Address1}</div>
          <div className="Address2-container">Address2: {Address2}</div>
          <div className="City-container">City: {City}</div>
          <div className="State-container">State: {State}</div>
          <div className="Zipcode-container">Zipcode: {Zipcode}</div>
        </div>
      </div>
      <button onClick={(e) => ShowForm()}>Change Information</button>
      {showForm ? (
        <form onSubmit={handleSubmit} className="changeForm">
          Change Information:
          <label>Name:</label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Address1</label>
          <input
            type="text"
            value={Address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
          <label>Address2</label>
          <input
            type="text"
            value={Address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
          <label>City</label>
          <input
            type="text"
            value={City}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>State</label>
          <input
            type="text"
            value={State}
            onChange={(e) => setState(e.target.value)}
          />
          <label>Zipcode</label>
          <input
            type="text"
            value={Zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}
