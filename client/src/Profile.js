import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Picture from "./profile-icon.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "./Profile.css";

export default function Profile() {
  const [showForm, setShowForm] = useState(false);

  const ShowForm = () => {
    setShowForm(!showForm);
    setStatus("");
  };

  const auth = useAuth();
  const user = auth.user;
  const navigate = useNavigate();
  const [image, setImage] = useState(Picture);
  const [Name, setName] = useState("Name");
  const [Address1, setAddress1] = useState("Address1");
  const [Address2, setAddress2] = useState("Address2");
  const [City, setCity] = useState("City");
  const [State, setState] = useState("State");
  const [Zipcode, setZipcode] = useState("Zipcode");
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [Status, setStatus] = useState("");
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
    const data = await axios.get(`http://localhost:3001/getUserInfo/${user}`);

    console.log("dataget:", data);
    setName(data.data[0].name);
    setAddress1(data.data[0].address1);
    setAddress2(data.data[0].address2);
    setCity(data.data[0].city);
    setState(data.data[0].state);
    setZipcode(data.data[0].zipcode);
    setUserInfo(data.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    auth.logout_();
    navigate("/");
  };

  const handleSubmit = (e) => {
    axios
      .put(`http://localhost:3001/update/${user}`, {
        Name: Name,
        Address1: Address1,
        Address2: Address2,
        City: City,
        State: State,
        Zipcode: Zipcode,
        Password: Password,
      })
      .then((response) => {
        if (response.data.message) {
          setStatus(response.data.message);
        } else {
          setShowForm();
        }
        console.log("response", response);
        fetchData();
      });
    if (NewPassword != "") {
      axios
        .put(`http://localhost:3001/updatePassword/${user}`, {
          Password: Password,
          NewPassword: NewPassword,
        })
        .then((response2) => {});
    }
    e.preventDefault();
  };

  return (
    <div className="container-Profile" style={{ color: "rgb(32, 177, 255)" }}>
      <div className="profileImage-container">
        <img src={image} alt="" className="image" />
      </div>
      <div className="profileInformation-container">
        <div className="Name-container">Name: {userInfo.name} </div>
        <div className="Address-container">
          <div className="Address1-container">
            Address1: {userInfo.address1}
          </div>
          <div className="Address2-container">
            Address2: {userInfo.address2}
          </div>
          <div className="City-container">City: {userInfo.city}</div>
          <div className="State-container">State: {userInfo.state}</div>
          <div className="Zipcode-container">Zipcode: {userInfo.zipcode}</div>
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
            defaultValue={userInfo.name}
            maxLength={20}
            className="nameBox"
          />
          <label>Address1:</label>
          <input
            type="text"
            defaultValue={userInfo.address1}
            onChange={(e) => setAddress1(e.target.value)}
            maxLength={30}
            className="address1Box"
          />
          <label>Address2:</label>
          <input
            type="text"
            defaultValue={userInfo.address2}
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
            className="form-select"
            type="text"
            onChange={(e) => setState(e.target.value)}
            defaultValue={userInfo.state}
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
          <label>New Password(leave empty if none): </label>
          <input
            type="text"
            defaultValue={""}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className="passBox"
          />
          <label>Password:</label>
          <input
            type="text"
            defaultValue={""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="passBox"
          />
          <h1>{Status}</h1>
          <button type="submit" className="submitBox">
            Submit
          </button>
        </form>
      ) : (
        <div></div>
      )}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
