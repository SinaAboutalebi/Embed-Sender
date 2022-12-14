//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const db = require('../schemas/users');

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Routes

//Set Embeds Router=========================================================//

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
      if (!json.errors) {
        res.render("success");
      } else res.render("error");
      return json;
    });
});

//Login Router==============================================================//
router.post("/login", async (req, res) => {

  db.find({ username: req.body.username },

    async (err, item) => {
      if (item.length < 1) { //Check User
        res.render("login", { data: "NotFound" })
      }
      else if (item.password = req.body.password) { //Check Password

        var options = {
          maxAge: 1000 * 60 * 60 * 24, //Set Cookie For a day
        };
        var value = process.env.SECRET_KEY;
        res.cookie("token", value, options);

        res.cookie("uuid", item['_id'], options);

        res.redirect("/");
      }
      else {
        res.render("login", { data: "BadPass" });
      }
    })

});

//Logout Router==============================================================//
router.get("/logout", async (req, res) => {

  let token = req.cookies["token"]; //Cookie

  if (!token) {
    return res.render("login", { data: "none" });
  } else {
    res.clearCookie("token"); //Clear Cookie

    return res.redirect("/");
  }

});

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Exports Router

module.exports = router;
