const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: { type: String, unique: true ,required: true, trim: true  },
    password: { type: String, required: true }, // hashed manually before save
    role: {type: String, enum:["students", "admin"], default: "students"},
    isBlocked: {type: Boolean, default: false}
},
{timestamps: true});

module.exports = mongoose.model("User", userSchema);