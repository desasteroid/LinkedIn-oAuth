import React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./css/loggedin.css";

const LoggedInForm = () => {
  //State variables
  const [oauthUserName, setOauthUserName] = useState("")
  const [userName, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [description, setDescription] = useState("");
  const [workFromDate, setWorkFromDate] = useState("");
  const [workToDate, setWorkToDate] = useState("");
  const [institute, setInstitute] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [eduLocation, setEduLocation] = useState("");
  const [eduFromDate, setEduFromDate] = useState("");
  const [eduToDate, setEduToDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  let navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("authMethod", 'oAuth');
    }
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/sign-in");
      return setLoading(false);
    }
    setLoading(false);

    //Fetch User Data
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          navigate("/sign-in");
          return;
        }

        if (data.status == "ok" && data.data) {
          setUsername(data.data.username);
          setFirstName(data.data.personalDetails.firstName);
          setLastName(data.data.personalDetails.lastName);
          setEmail(data.data.personalDetails.email);
          setPhone(data.data.personalDetails.phone);
          setAddress(data.data.personalDetails.address);
          setBio(data.data.personalDetails.bio);
          setSkills(data.data.personalDetails.skills);
          setRole(data.data.workExperience.role);
          setCompany(data.data.workExperience.company);
          setOfficeLocation(data.data.workExperience.officeLocation);
          setDescription(data.data.workExperience.description);
          setWorkFromDate(data.data.workExperience.workFromDate);
          setWorkToDate(data.data.workExperience.workToDate);
          setInstitute(data.data.educationDetails.institute);
          setMajor(data.data.educationDetails.major);
          setDegree(data.data.educationDetails.degree);
          setEduLocation(data.data.educationDetails.eduLocation);
          setEduFromDate(data.data.educationDetails.eduFromDate);
          setEduToDate(data.data.educationDetails.eduToDate);
        } else if (data.status == "ok") {
          setUsername(data.username);
        } else {
          alert("Internal Server Error!");
          window.localStorage.clear();
          navigate("/sign-in");
          return;
        }
        setOauthUserName(data.data.personalDetails.firstName);
      });
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/sign-in");
  };

  const handleSubmit = (event) => {
    console.log("Submit Button Clicked");
    event.preventDefault();
    const resumeData = {
      username: userName,
      personalDetails: {
        firstName,
        lastName,
        email,
        phone,
        address,
        bio,
        skills,
      },
      workExperience: {
        role,
        company,
        officeLocation,
        description,
        workFromDate,
        workToDate,
      },
      educationDetails: {
        institute,
        major,
        degree,
        eduLocation,
        eduFromDate,
        eduToDate,
      },
    };
    console.log(resumeData);
    axios
      .post("http://localhost:5000/saveResumeData", resumeData)
      .then((res) => {
        console.log("Data Insertion Request Status: ", res.data.status);
      });
    setOauthUserName(firstName);
  };
  return (
    <>
      {loading && <div className="Loader-Animation" />}
      <div className="page-container">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                align="left"
                sx={{
                  flexGrow: 1,
                  justifyContent: "flex-start",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                }}
              >
                Hi { window.localStorage.getItem("authMethod")? oauthUserName : userName }
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <div className="form-container">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "1000ch" },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                margin: "3rem 0rem",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              }}
            >
              Personal Details
            </Typography>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="form-row">
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Phone No."
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                multiline
                rows={4}
                required
                fullWidth
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Description(Bio)"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                multiline
                rows={4}
                required
                fullWidth
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Skills"
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
                multiline
                rows={4}
                required
                fullWidth
              />
            </div>
            <Typography
              variant="h5"
              component="div"
              sx={{
                margin: "3rem 0rem",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              }}
            >
              Latest Work Experience
            </Typography>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Company"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                required
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Office Location"
                onChange={(e) => setOfficeLocation(e.target.value)}
                value={officeLocation}
                fullWidth
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                multiline
                rows={4}
                fullWidth
              />
            </div>
            <div className="form-row">
              <TextField
                type="date"
                variant="outlined"
                label="From"
                onChange={(e) => setWorkFromDate(e.target.value)}
                value={workFromDate}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                variant="outlined"
                label="To"
                onChange={(e) => setWorkToDate(e.target.value)}
                value={workToDate}
                required
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <Typography
              variant="h5"
              component="div"
              sx={{
                margin: "3rem 0rem",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              }}
            >
              Latest Education
            </Typography>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Institution"
                onChange={(e) => setInstitute(e.target.value)}
                value={institute}
                fullWidth
                required
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Major"
                onChange={(e) => setMajor(e.target.value)}
                value={major}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Degree"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>

            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Location"
                onChange={(e) => setEduLocation(e.target.value)}
                value={eduLocation}
                fullWidth
                required
              />
            </div>
            <div className="form-row">
              <TextField
                type="date"
                variant="outlined"
                label="From"
                onChange={(e) => setEduFromDate(e.target.value)}
                value={eduFromDate}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                variant="outlined"
                label="To"
                onChange={(e) => setEduToDate(e.target.value)}
                value={eduToDate}
                required
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <Button
              type="submit"
              sx={{ margin: "2rem 0rem" }}
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default LoggedInForm;
