import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Picture from "./profile-icon.jpg";
import { useDropzone } from "react-dropzone";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
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
  const auth = useAuth()
  const navigate = useNavigate()
  const fileInputField = useRef(null);
  const [image, setImage] = useState(Picture);
  const [Name, setName] = useState("Name");
  const [Address1, setAddress1] = useState("Address1");
  const [Address2, setAddress2] = useState("Address2");
  const [City, setCity] = useState("City");
  const [State, setState] = useState("State");
  const [Zipcode, setZipcode] = useState("Zipcode");
  const [userInfo, setUserInfo] = useState(null);
  const handleLogout = ()=>{
    auth.logout_()
    navigate('/')
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get(`http://localhost:3001/getUserInfo/${auth.user}`);
      const data = await response;
      setUserInfo(data)

      setName(data.data[0].name)
      setAddress1(data.data[0].address1)
      setAddress2(data.data[0].address2)
      setCity(data.data[0].city)
      setState(data.data[0].state)
      setZipcode(data.data[0].zipcode)
      console.log(data.data[0].name)
    };

    fetchData();
  }, []);

  if(!userInfo){
    return <p>Loading...</p>;
  }

  const SubmitInformation = () => {
    
    axios.put(`http://localhost:3001/update/${auth.user}`, {
      Name:Name,
      Address1:Address1,
      Address2:Address2,
      City:City,
      State:State,
      Zipcode:Zipcode
    }).then((response)=>{
      console.log(response)
    });

    // console.log(1)

    
    //backend stuff
    // setResponseData({
    //   name: Name,
    // });
    // axios.post("http://localhost:3001/register", responseData);
  };

  return (
    <div className="container-Profile">
     
      <div className="profileImage-container">
        <img src={image} alt="" className="image" />
      </div>
      <div className="profileInformation-container">
        <div className="Name-container">Name: {Name} </div>
        <div className="Address-container">
          <div className="Address1-container">Address1:  {Address1}</div>
          <div className="Address2-container">Address2:  {Address2}</div>
          <div className="City-container">City: {City}</div>
          <div className="State-container">State:  {State}</div>
          <div className="Zipcode-container">Zipcode:  {Zipcode}</div>
        </div>
      </div>
      <button onClick={(e) => ShowForm()}>Change Information</button>
      {showForm ? (
        <form className="changeForm">
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
          
        </form>
        
      ) : (
        <div></div>
      )}
      <button onClick={SubmitInformation}> Submit Information</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
