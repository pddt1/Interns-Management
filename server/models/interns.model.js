const mongoose = require('mongoose');
const Intern=mongoose.model(
    'Intern',
    new mongoose.Schema({
        // nid: String,
        fullName: String,
        phoneNumber: String,
        major: String,
        year: Number,
        result: Boolean,
        startDay: String,
        endDay: String,
        cv: String,
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // }
    })
);
module.exports=Intern;