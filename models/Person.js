const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },

    secondname:{
        type: String,
        required :true
    },

    date :{
        type:Date,
        required : true,
        default : Date.now
    }
})

module.exports = mongoose.model("person",PersonSchema);