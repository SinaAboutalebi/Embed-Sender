//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Packages

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Functions

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((db) => {
    console.log(" [✅] DB Connected Successfully.");
}).catch((error) =>{
    console.log("[❌] DB Failed To Connect.", error)
})

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Export Conenction

module.exports = exports = mongoose;