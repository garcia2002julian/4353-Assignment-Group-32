import Navbar from "./Components/Navbar/Navbar";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Picture from "./profile-icon.jpg";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
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

  //FIXME: This doesnt work
  const auth = useAuth();
  const user = "testing123";
  const navigate = useNavigate();
  const [image, setImage] = useState(Picture);
  const [Name, setName] = useState("Name");
  const [Address1, setAddress1] = useState("Address1");
  const [Address2, setAddress2] = useState("Address2");
  const [City, setCity] = useState("City");
  const [State, setState] = useState("State");
  const [Zipcode, setZipcode] = useState("Zipcode");
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zipcode: "",
  });

  //For database
  const fetchData = async () => {
    const data = await axios.get(
      `http://localhost:3001/getUserInfo?user=${user}`
    );

    console.log("data:", data);
    setName(data.data.Name);
    setAddress1(data.data.Address1);
    setAddress2(data.data.Address2);
    setCity(data.data.City);
    setState(data.data.State);
    setZipcode(data.data.Zipcode);
    setUserInfo(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    //auth.logout_(); used when using database
    navigate("/");
  };

  const handleSubmit = (e) => {
    setShowForm();
    axios
      .put(`http://localhost:3001/update?username=${user}`, {
        Name: Name,
        Address1: Address1,
        Address2: Address2,
        City: City,
        State: State,
        Zipcode: Zipcode,
      })
      .then((response) => {
        console.log(response);
        fetchData();
      });
  };

  return (
    <div className="container-Profile" style={{ color: "rgb(32, 177, 255)" }}>
      <Navbar />
      <div className="profileImage-container">
        <img src={image} alt="" className="image" />
      </div>
      <div className="profileInformation-container">
        <div className="Name-container">Name: {userInfo.Name} </div>
        <div className="Address-container">
          <div className="Address1-container">
            Address1: {userInfo.Address1}
          </div>
          <div className="Address2-container">
            Address2: {userInfo.Address2}
          </div>
          <div className="City-container">City: {userInfo.City}</div>
          <div className="State-container">State: {userInfo.State}</div>
          <div className="Zipcode-container">Zipcode: {userInfo.Zipcode}</div>
        </div>
      </div>
      <button className="profileButton" onClick={(e) => ShowForm()}>
        Change Information
      </button>
      {showForm ? (
        <form onSubmit={handleSubmit} className="changeForm">
          Change Information:
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            defaultValue={userInfo.Name}
            maxLength={20}
            className="nameBox"
          />
          <label>Address1:</label>
          <input
            type="text"
            defaultValue={userInfo.Address1}
            onChange={(e) => setAddress1(e.target.value)}
            maxLength={30}
            className="address1Box"
          />
          <label>Address2:</label>
          <input
            type="text"
            defaultValue={userInfo.Address2}
            onChange={(e) => setAddress2(e.target.value)}
            maxLength={30}
            className="address2Box"
          />
          <label>City:</label>
          <input
            type="text"
            value={City}
            onChange={(e) => {
              // if (e.target.value.includes(/g[0-9]/)) return;
              setCity(e.target.value);
            }}
            maxLength={15}
            className="cityBox"
          />
          <label>State:</label>
          <select
            class="form-select"
            type="text"
            onChange={(e) => setState(e.target.value)}
            defaultValue={userInfo.State}
          >
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AR">AR</option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DC">DC</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option>
            <option value="WV">WV</option>
            <option value="WY">WY</option>
          </select>
          <label>Zipcode:</label>
          <input
            type="number"
            value={Zipcode}
            onChange={(e) => {
              if (e.target.value.toString().length > 8) return;
              setZipcode(e.target.value);
            }}
            maxLength={8}
            className="zipBox"
          />
          <label>Change Image:</label>
          <MyDropzone setImage={setImage}></MyDropzone>
          <input type="submit" value="Submit" className="submitBox" />
        </form>
      ) : (
        <div></div>
      )}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
