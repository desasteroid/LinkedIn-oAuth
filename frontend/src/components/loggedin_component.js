import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./css/loggedin.css";

const LoggedInForm = () => {
  const userName = "Aniket";
  const handleSubmit = () => {
    console.log("Button Clicked");
  };
  return (
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
              Hi {userName}
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="form-container">
        <form>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "1000ch" },
            }}
            autoComplete="off"
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
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
                error={"a" === "a"}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Last Name"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
              />
            </div>
            <div className="form-row">
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Phone No."
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Address"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
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
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
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
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
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
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Company"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Office Location"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                fullWidth
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Description"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
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
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                variant="outlined"
                label="To"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
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
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                fullWidth
                required
              />
            </div>
            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Major"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                label="Degree"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
              />
            </div>

            <div className="form-row">
              <TextField
                type="text"
                variant="outlined"
                label="Location"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                fullWidth
                required
              />
            </div>
            <div className="form-row">
              <TextField
                type="date"
                variant="outlined"
                label="From"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                variant="outlined"
                label="To"
                // onChange={(e) => setFirstName(e.target.value)}
                // value={firstName}
                required
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <Button
              type="submit"
              sx={{ margin: "2rem 0rem" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default LoggedInForm;
