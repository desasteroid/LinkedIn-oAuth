const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    username: String,
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);
