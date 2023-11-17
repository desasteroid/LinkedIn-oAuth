const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const passport = require("passport");
const session = require('express-session');
const LinkedInStrategy = require('passport-linkedin-oauth2-oidc').Strategy;

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

const JWT_SECRET =
  "hghckgukuhylvv7ltuli6465567i7576lnir66846468utieunin959tm8v9ccc{{}cmopsp5475655665343ctsojynvs";

const mongoUrl =
  "mongodb+srv://priyanka76399:Anjali399@cluster0.nvc0pxi.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  require("./userDetails");
  require("./resumeDetails");
  const User = mongoose.model("UserInfo");
  const resumeData = mongoose.model("ResumeInfo");

//passport
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACKURL,
  scope: ['openid','email','profile'],
}, function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  // console.log("token: ",accessToken, refreshToken, profile, done);
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));


app.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['openid','email','profile'],
}), async (req,res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req,res);
});

// app.get('/auth/linkedin/callback',
//   passport.authenticate('linkedin'), (req,res) => {
//     console.log("dytfghusfjflkhjb",req.user);
//   });

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/success',
    failureRedirect: '/login-user'
  }));


app.get("/success",async (req,res) => {
  // console.log("sdfghjhjggf",req.user);
  res.send(req.user._json);
});

app.post("/register", async (req, res) => {
  const { username, fname, lname, email, password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      username,
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InValid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

app.post("/saveResumeData", async(req, res) => {
  let data = req.body;
  console.log("Resume Data: ",data);
  try{
    const insert = await resumeData.create(data)
    console.log(insert);
  } catch(error)
  {
    res.send({ status: "error", data: error })
  }
  res.send({status: "success"});
})

app.listen(5000, () => {
  console.log("Server Started");
});