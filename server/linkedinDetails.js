const mongoose = require("mongoose");

const LinkedinDetailsScehma = new mongoose.Schema(
  {
    accessToken: String,
    refreshToken: String,
    id: { type: String, unique: true },
    email: String,
    fname: String,
    lname: String,
    picture: String
  },
  {
    collection: "LinkedinInfo",
  }
);

mongoose.model("LinkedinInfo", LinkedinDetailsScehma);
