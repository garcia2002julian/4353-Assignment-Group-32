import Navbar from "./Components/Navbar/Navbar";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Picture from "./pexels-fcl-by-photofabiannicom-5411674.jpg";
import { useDropzone } from "react-dropzone";

// var Name = "NAME";
// var Address1 = "Address1";
// var Address2 = "Address2";
// var City = "City";
// var State = "State";
// var Zipcode = "zipcode";

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
    console.log(showForm);
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
    //backend stuff
    // setResponseData({
    //   name: Name,
    // });
    // axios.post("http://localhost:3001/register", responseData);
  };

  return (
    <div className="container-Profile">
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
          <label>Change Image</label>
          {/* <input
            type="file"
            accept="image/*"
            multiple="false"
            onChange={(e) => {
              const reader = new FileReader();
              console.log(e.target.files.file);
              setImage(e.target.files.file);
            }}
            title=""
            value=""
          /> */}
          <MyDropzone setImage={setImage}></MyDropzone>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}
