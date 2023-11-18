const mongoose = require("mongoose");
 
const ResumeDetailsScehma = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    picture: { type: String, default: ""},
    personalDetails: {
        firstName: { type: String, default: ""},
        lastName: { type: String, default: ""},
        email: { type: String, default: ""},
        phone: { type: String, default: ""},
        address: { type: String, default: ""},
        bio: { type: String, default: ""},
        skills: { type: String, default: ""},
    },
    workExperience: {
        role: { type: String, default: ""},
        company: { type: String, default: ""},
        officeLocation: { type: String, default: ""},
        description: { type: String, default: ""},
        workFromDate: { type: String, default: ""},
        workToDate: { type: String, default: ""},
    },
    educationDetails: {
        institute: { type: String, default: ""},
        major: { type: String, default: ""},
        degree: { type: String, default: ""},
        eduLocation: { type: String, default: ""},
        eduFromDate: { type: String, default: ""},
        eduToDate: { type: String, default: ""},
    }
  },
  {
    collection: "ResumeInfo",
  }
);
 
mongoose.model("ResumeInfo", ResumeDetailsScehma);