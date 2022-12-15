//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const db = require('../schemas/users');

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Routes

//Home View Router==========================================================//

router.get("/", async (req, res) => {
  let token = req.cookies["token"];
  let uuid = req.cookies["uuid"];

  if (!token) {
    return res.render("login", { data: "none" });
  }

  if (token != process.env.SECRET_KEY) {
    res.clearCookie("token");

    return res.render("login", { data: "none" });
  }

  db.find({ uuid },

    async (err, item) => {
      if (item.length < 1) { //Check User
        res.redirect("/api/logout")
      } else {

        let data = await fetch("https://discordapp.com/api/v9/users/@me/guilds", {
          method: "GET",
          headers: {
            Authorization: `Bot ${item[0].tkn}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            return json;
          });

        res.render("servers", { data: data });
      }
    });
});

//Server View Router========================================================//

router.get("/server/:id", async (req, res) => {
  let token = req.cookies["token"];

  if (!token) {
    return res.render("login", { data: "none" });
  }

  if (token != process.env.SECRET_KEY) {
    res.clearCookie("token");

    return res.render("login", { data: "none" });
  }

  let { id } = req.params;

  let data = await fetch(
    `https://discordapp.com/api/v9/guilds/${id}/channels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  let roles = await fetch(`https://discordapp.com/api/v9/guilds/${id}/roles`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  if (!data[0]) {
    res.render("404");
  } else {
    res.render("embed", { data: data, roles: roles });
  }
});
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Exports Router

module.exports = router;
