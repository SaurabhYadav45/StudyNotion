const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String
    },
    SubSection:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    },
});

module.exports = mongoose.model("Section", sectionSchema);