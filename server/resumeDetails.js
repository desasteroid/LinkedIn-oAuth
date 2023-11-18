const mongoose = require("mongoose");
 
const ResumeDetailsScehma = new mongoose.Schema(
  {
    personalDetails: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        bio: String,
        skills: String
    },
    workExperience: {
        role: String,
        company: String,
        officeLocation: String,
        description: String,
        workFromDate: String,
        workToDate: String
    },
    educationDetails: {
        institute: String,
        major: String,
        degree: String,
        eduLocation: String,
        eduFromDate: String,
        eduToDate: String
    }
  },
  {
    collection: "ResumeInfo",
  }
);
 
mongoose.model("ResumeInfo", ResumeDetailsScehma);