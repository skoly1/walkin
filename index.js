require("dotenv").config();

const authkey = process.env.AUTH_KEY;
const template_id = process.env.template_id;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const http = require("https");

const sendOtp = (mobilenumber) => {
  const options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/v5/otp?template_id=${template_id}&mobile=91${mobilenumber}&authkey=${authkey}`,
    headers: {
      "Content-Type": "application/JSON",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      //   result.push(body.toString());
    });
  });

  req.write(
    '{\n  "Param1": "value1",\n  "Param2": "value2",\n  "Param3": "value3"\n}'
  );
  req.end();
};

app.get("/api/otp", (req, res) => {
  const mobilenumber = req.query.mobilenumber;
  sendOtp(mobilenumber);
  res.send("OTP Sent");
});

const verifyOtp = (mobilenumber, otp) => {
  const options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/v5/otp/verify?otp=${otp}&authkey=${authkey}&mobile=${mobilenumber}`,
    headers: {},
  };
  const chunks = [];
  const req = http.request(options, function (res) {
    // const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  req.end();
};

app.post("/api/otp", (request, response) => {
  const mobilenumber = request.body.mobilenumber;
  const otp = request.body.otp;

  const options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/v5/otp/verify?otp=${otp}&authkey=${authkey}&mobile=${mobilenumber}`,
    headers: {},
  };
  const chunks = [];
  const req = http.request(options, function (res) {
    // const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      response.send(body.toString());
    });
  });
  req.end();
});

const port = 8000;
app.listen(port, () => {
  console.log(`app running ${port}`);
});
