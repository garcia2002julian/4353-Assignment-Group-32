import Navbar from "./Components/Navbar/Navbar";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Picture from "./profile-icon.jpg";
import { useDropzone } from "react-dropzone";
import "./Profile.css";

function MyDropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    const img = new Image();
    img.src = URL.createObjectURL(acceptedFiles[0]);
    img.onload = () => {
      if (
        img.width < 300 &&
        img.height < 300 &&
        img.width > 150 &&
        img.height > 150
      )
        props.setImage(URL.createObjectURL(acceptedFiles[0]));
      else {
        return;
      }
    };
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>click to select files</p>
      )}
    </div>
  );
}

export default function Profile() {
  const [showForm, setShowForm] = useState(false);

  const ShowForm = () => {
    setShowForm(!showForm);
  };

  // using this when getting into the backend

  //   useEffect(async () => {
  //     const data = await axios.get("http://localhost:3001/register");
  //     setResponseData(data);
  //   }, []);

  //const [responseData, setResponseData] = useState();

  const fileInputField = useRef(null);
  const [image, setImage] = useState(Picture);
  const [Name, setName] = useState("Name");
  const [Address1, setAddress1] = useState("Address1");
  const [Address2, setAddress2] = useState("Address2");
  const [City, setCity] = useState("City");
  const [State, setState] = useState("State");
  const [Zipcode, setZipcode] = useState("Zipcode");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    setAddress1(e.target[1].value);
    setAddress2(e.target[2].value);
    setCity(e.target[3].value);
    setState(e.target[4].value);
    setZipcode(e.target[5].value);
    setShowForm();
    //backend stuff
    // setResponseData({
    //   name: Name,
    // });
    // axios.post("http://localhost:3001/register", responseData);
  };

  return (
    <div className="container-Profile" style={{color:"rgb(32, 177, 255)"}}>
      <Navbar />
      <div className="profileImage-container">
        <img src={image} alt="" className="image" />
      </div>
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
      <button className="profileButton" onClick={(e) => ShowForm()}>Change Information</button>
      {showForm ? (
        <form onSubmit={handleSubmit} className="changeForm">
          Change Information:
          <label>Name:</label>
          <input type="text" defaultValue={Name} maxLength={20} />
          <label>Address1</label>
          <input type="text" defaultValue={Address1} maxLength={30} />
          <label>Address2</label>
          <input type="text" defaultValue={Address2} maxLength={30} />
          <label>City</label>
          <input type="text" defaultValue={City} maxLength={15} />
          <label>State</label>
          <input type="text" defaultValue={State} maxLength={20} />
          <label>Zipcode</label>
          <input type="text" defaultValue={Zipcode} maxLength={8} />
          <label>Change Image</label>
          <MyDropzone setImage={setImage}></MyDropzone>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}
