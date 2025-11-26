const express = require("express");
const hostRouter = express.Router();

const path = require("path");

const rootDir = require("../utils/pathUtil");

// hostRouter.get("/host/add-home", (req, res, next) => {
//   res.send(`<h1>Register for a home</h1>
//             <form action="/host/add-home" method="POST">
//               <input type="text" name="houseName" placeholder="Enter the name of your house" />
//               <br />
//               <br />
//               <input type="submit" />
//             </form>`);
// }); // we can add /host like this or just can add it to app.js & concat it to the hostrouter

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
});

module.exports = hostRouter;
