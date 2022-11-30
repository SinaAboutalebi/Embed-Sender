//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Packages

const mongoose = require("mongoose");

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Define Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  tkn: {
    type: String,
  },
  avatar: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  uuid:{
    type:String,
    required: true,
    unique: true,
  }

});

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Export Schema

module.exports = mongoose.model("embedsender", userSchema);