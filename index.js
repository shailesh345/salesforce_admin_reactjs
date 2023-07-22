const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/admin/login", async function (req, res, next) {
  try {
    const apiRes = await axios.post(
      "https://kp2hnyu3a1.execute-api.us-east-1.amazonaws.com/dev/adminlogin",
      req.body
    );

    let data = {
      user: {
        uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
        from: "custom-db",
        role: "admin",
        data: {
          displayName: "Admin",
          photoURL: "assets/images/avatars/brian-hughes.jpg",
          email: req.body.email,
          settings: {
            layout: {},
            theme: {},
          },
          shortcuts: ["apps.calendar", "apps.mailbox", "apps.contacts"],
        },
      },
      access_token: apiRes.data.token,
    };
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    let error = [];
    error.push({
      type: "email",
      message: "Check your email address",
    });
    res.status(403).json(...error);
  }
});

app.get("/admin/getUsers", async function (req, res, next) {
  try {
    let apiResponse = await axios.get(
      "https://zf45nhd5xg.execute-api.us-east-1.amazonaws.com/dev/AdminUsers",
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    //console.log(apiResponse.data);
    res.status(200).send(apiResponse.data);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

app.post("/admin/toggleUser", async (req, res, next) => {
  try {
    const apiRes = await axios.post(
      "https://8rpty82jfd.execute-api.us-east-1.amazonaws.com/admin/userToggleStatus",
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).send(apiRes.data);
  } catch (err) {
    //console.log(err);
    res.status(401).json(err);
  }
});

app.get("/admin/subscriptionPlans", async function (req, res, next) {
  try {
    let apiResponse = await axios.get(
      "https://uiv07lpxq2.execute-api.us-east-1.amazonaws.com/admin/subscriptionPlans",
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    //console.log(apiResponse.data);
    res.status(200).send(apiResponse.data);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

app.post("/admin/sendCredentialEmail", async function (req, res, next) {
  try {
    let apiResponse = await axios.post(
      "https://8r8p1bl7tf.execute-api.us-east-1.amazonaws.com/admin/sendCredentialEmail",
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    //console.log(apiResponse.data);
    res.status(200).send(apiResponse.data);
  } catch (err) {
    console.log(err);
    res.status(201).json(err);
  }
});

// Subscription updfate
app.post("/admin/editSubscriptionPlan", async function (req, res, next) {
  try {
    let apiResponse = await axios.post(
      "https://v11lm0cut1.execute-api.us-east-1.amazonaws.com/admin/editSubscriptionPlan",
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    //console.log(apiResponse.data);
    res.status(200).send(apiResponse.data);
  } catch (err) {
    console.log(err);
    res.status(201).json(err);
  }
});

app.get("/", (req, res, next) => {
  res.send("Fine");
});

app.get("/", (req, res, next) => {
  res.send("Fine");
});
app.listen(8081, function () {
  console.log("CORS-enabled web server listening on port 8081");
});
