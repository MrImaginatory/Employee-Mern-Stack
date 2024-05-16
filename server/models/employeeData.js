const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true    
    },
    mobileNo:{
        type: Number,
        require:true 
    },
    designation:{
        type: String,
        require:true
    },
    gender:{
        type: String,
        require:true
    },
    course:{
        type: [String],
        default: [],
        enum:['MCA','BCA','BSc'],
        require:true
    },
    image:{
        type: String,
        require:true
    }
},{timestamps: true})

module.exports = mongoose.model('Employee', employeeSchema)