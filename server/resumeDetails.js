const mongoose = require("mongoose");
 
const ResumeDetailsScehma = new mongoose.Schema(
  {
    personalDetails: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: String,
        address: String,
        bio: String,
        skills: String
    },
    workExperience: {
        role: String,
        company: String,
        officeLocation: String,
        description: String,
        workFromDate: Date,
        workToDate: Date
    },
    educationDetails: {
        institution: String,
        major: String,
        degree: String,
        eduLocation: String,
        eduFromDate: Date,
        eduTODate: Date
    }
  },
  {
    collection: "ResumeInfo",
  }
);
 
mongoose.model("ResumeInfo", ResumeDetailsScehma);