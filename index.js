//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
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

const routes = require("./routes/routes.js");

const app = express();
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Colors

magenta = "\x1b[35m";
cyan = "\x1b[36m";
blue = "\x1b[34m";

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Middle Wares

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/static", express.static("public"));
app.use(express.static("public"));

app.use("/", routes);

app.use("*", (req, res) => {
  res.render("404");
});
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Start Server

app.listen(process.env.PORT, async () => {
  console.log(
    magenta,
    "[📶]Server Is Running Properly ....\n[ℹ️]Port : ",
    process.env.PORT
  );

  client.on("ready", () => {
    console.log(
      blue,
      `[✅] Logged in as ${client.user.tag} (${client.user.id}).`
    );
    console.log(cyan, "[🖥️] Coded By Great0P🦠");

    client.user.setStatus("idle");
    //client.user.setActivity(process.env.STATUS, { type: "LISTENING" }); #OLD Version
    client.user.setActivity('Coded By Great0P🖥️', {
      type: ActivityType.Watching,
    });
  });
});
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Bot Login
client.login(process.env.TOKEN);
