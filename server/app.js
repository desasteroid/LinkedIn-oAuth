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

const JWT_SECRET = process.env.JWT_SECRET
const mongoUrl = process.env.MONGODB_URL
const CLIENT_URL = process.env.CLIENT_URL

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
  require("./linkedinDetails");
  const User = mongoose.model("UserInfo");
  const resumeData = mongoose.model("ResumeInfo");
  const linkedinData = mongoose.model("LinkedinInfo");

//passport
// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

passport.use(new LinkedInStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACKURL,
  scope: ['openid','email','profile'],
}, async function (accessToken, refreshToken, profile, done) {
  try{
    const profileData = {
      accessToken,
      refreshToken: refreshToken,
      id: profile.id,
      fname : profile.givenName,
      lname : profile.familyName,
      email : profile.email,
      picture : profile.picture
    };
    const resumeInfo = {
      username: profile.id,
      picture: profile.picture,
      personalDetails: {
        firstName: profile.givenName,
        lastName: profile.familyName,
        email: profile.email,
      }
    }
    const user = await linkedinData.findOne({ username: profile.id });
    if(!user) {
      const insert = await linkedinData.create(profileData);
      const resumeInsert = await resumeData.create(resumeInfo);
      console.log("DB Insert :", insert, resumeInsert);
    } else {
      const update = await linkedinData.updateOne({ username: profile.id }, profileData);
      const resumeUpdate = await resumeData.updateOne({username: profile.id}, resumeInfo);
      console.log("DB Update:", update, resumeUpdate);
    }
  } catch(error)
  {
    console.log(error);
  }
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

app.get('/auth/linkedin/callback', function(req, res, next) {
  passport.authenticate('linkedin', function(err, user, info, status) {
    if (err) { return res.redirect(CLIENT_URL) }
    if (!user) { return res.redirect(CLIENT_URL) }
    const token = jwt.sign({ username:  user.id}, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.redirect(CLIENT_URL + "loggedin?token=" + token);
  })(req, res, next);
});

app.get("/success",async (req,res) => {
  // console.log("sdfghjhjggf",req.user);
  res.send(req.user);
});

app.post("/register", async (req, res) => {
  const { username, fname, lname, email, password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUserEmailVal = await User.findOne({ email });
    if (oldUserEmailVal) {
      return res.json({ error: "Account already exists for this email." });
    }

    const oldUserUnameVal = await User.findOne({ username })
    if (oldUserUnameVal) {
      return res.json({ error: "Username already in use."});
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
    res.send({ error: "Something went wrong."});
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
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

    const username = user.username;
    resumeData.findOne({ username: username })
      .then((data) => {
        res.send({ status: "ok", username, data: data });
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
    const user = await resumeData.findOne({ username: data.username });
    if(!user) {
      const insert = await resumeData.create(data)
      console.log("DB Insert :", insert);
    } else {
      const update = await resumeData.updateOne({ username: data.username }, data);
      console.log("DB Update:", update);
    }
  } catch(error)
  {
    res.send({ status: "error", data: error })
  }
  res.send({status: "success"});
})

app.listen(5000, () => {
  console.log("Server Started");
});