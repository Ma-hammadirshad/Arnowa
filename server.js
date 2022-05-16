const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const moment = require("moment");

// Import the library:
var cors = require("cors");

var app = express();

// Then use it before your routes are set up:
app.use(cors());

app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));

// Set up a whitelist and check against it:
var whitelist = ["http://localhost:3000", "*"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Then pass them to cors:
app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6492452",
  password: "VcsIxe9hz7",
  port: "3306",
  database: "sql6492452",
});

app.post("/api/login", async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.send({ message: "name and email is required." });
  }

  let sql = `SELECT * FROM users WHERE name='${req.body.name}' and email='${req.body.email}' and mobile='${req.body.mobile}'`;
  console.log(sql);
  db.query(sql, function (err, data, fields) {
    if (err) throw err;

    console.log(data.length);
    if (data.length) {
      var resultArray = Object.values(JSON.parse(JSON.stringify(data)));

      console.log(moment(data[0].loginTime).startOf("minute").fromNow());
      var TEN_MINUTES = 10 * 60 * 1000;
      console.log(new Date(data[0].loginTime));
      var duration = Date.now() - new Date(data[0].loginTime).getTime();
      const reLogin = duration > TEN_MINUTES ? true : false;
      console.log(reLogin);

      if (data[0].name == "admin" && data[0].email == "admin@admin.com") {
        res.json({
          status: 200,
          isAdmin: true,
          loggedIn: true,
          data: { data },
          message: "Admin details retrieved successfully",
        });
      } else if (reLogin) {
        res.json({
          status: 200,
          isAdmin: "false",
          expired: "true",
          data: { data },
          message: "Session expired, Please relogin",
        });
      } else {
        res.json({
          status: 200,
          isAdmin: "false",
          expired: "false",
          data: { data },
          message: "Data fetched successfully",
        });
      }
    } else {
      let sql1 = `INSERT INTO users VALUES('','${req.body.name}','${req.body.mobile}','${req.body.email}','${req.body.loginTime}')`;
      console.log(sql1);
      db.query(sql1, function (err, data1, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          isAdmin: "false",
          loggedIn: "false",
          newuser: "true",
          data: resultArray,
          message: "User lists retrieved successfully",
        });
      });
    }
  });
});

app.post("/api/submitMessage", async (req, res) => {
  let sql = `INSERT INTO  message VALUES('','${req.body.message}','${req.body.emial}')`;
  console.log(sql);
  db.query(sql, function (err, data, fields) {
    if (err) throw err;

    res.json({
      status: 200,
      data: data,
      message: "Success",
    });
  });
});

app.get("/api/getUserDetails", async (req, res) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;

    // let dlength = data.length,
    //   dd = [];
    // for (i = 0; i < dlength; i++) {
    //    const ddd = {
    //       data
    //   };
    // }
    let ddd = Object.values(JSON.parse(JSON.stringify(data)));
    console.log(Object.values(JSON.parse(JSON.stringify(data))));
    res.json({
      status: 200,
      data: ddd,
      message: "User lists retrieved successfully",
    });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
