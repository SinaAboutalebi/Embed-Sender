//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const routes = require("./routes");
const mongoose = require("./utility/dbConnection");

const app = express();
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Colors

magenta = "\x1b[35m";
cyan = "\x1b[36m";
blue = "\x1b[34m";

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Middle Wares

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/static", express.static("public"));

app.use("/", routes);

app.use("*", (req, res) => {
  res.render("404");
});
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Start Server

app.listen(process.env.PORT, async () => {
  console.log(
    magenta,
    "[📶]Server Is Running Properly ....\n [ℹ️]Port : ",
    process.env.PORT
  );

  client.once("ready", () => {
    console.log(
      blue,
      `[✅] Logged in as ${client.user.tag} (${client.user.id}).`
    );
    console.log(cyan, "[🖥️] Coded By Savage 0P :)🦠");

    client.user.setStatus("idle");
    //client.user.setActivity(process.env.STATUS, { type: "LISTENING" }); #OLD Version
    client.user.setActivity("Coded By Savage 0P :)🖥️", {
      type: ActivityType.Watching,
    });
  });
});
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Bot Login

client.login(process.env.TOKEN);
