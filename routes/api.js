//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Routes

router.post("/send", async (req, res) => {

  let embed = {
    timestamp: new Date().toISOString(),
  };
  //Set Embeds Parameters===================================================//
  if (req.body.title) {
    embed.title = req.body.title;
  }
  if (req.body.url) {
    embed.url = req.body.url;
  }

  if (req.body.description) {
    embed.description = req.body.description;
  }

  if (req.body.thumbnail) {
    embed.thumbnail = {
      url: req.body.thumbnail,
    };
  }

  if (req.body.image) {
    embed.image = {
      url: req.body.image,
    };
  }

  if (req.body.footer) {
    embed.footer = {
      text: req.body.footer,
    };
  }

  if (req.body.footerUrl) {
    embed.footer.icon_url = req.body.footerUrl;
  }

  if (req.body.color) {
    embed.color = parseInt(req.body.color.split("#")[1], 16);
  }
  //Crete Body Object=========================================================//
  let body = {
    embeds: [embed],
  };

  if (req.body.role != "none") {
    if (req.body.role === "@everyone") {
      body.content = "@everyone";
    } else {
      body.content = `<@&${req.body.role}>`;
    }
  }
  //Send Embed W/ Discord===================================================//

  let data = await fetch(
    `https://discord.com/api/v10/channels/${req.body.channelid}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((res) => res.json())
    .then((json) => {
      return console.log(json);
    });

  res.render("success");
});
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Exports Router

module.exports = router;
