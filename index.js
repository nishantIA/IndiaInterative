const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = process.env.PORT || 5050;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/assets/css"));
app.use("/js", express.static(__dirname + "/public/assets/js"));
app.use("/images", express.static(__dirname + "/public/assets/images"));
app.use("/fonts", express.static(__dirname + "/public/assets/fonts"));
app.use("/less", express.static(__dirname + "/public/assets/less"));

app.post("/submit-form", async (req, res) => {
  try {
    const formData = req.body;

    const apiResponse = await axios.post(
      "https://landing-pages-be.ialabs.co.in/api/leads",
      formData
    );

    console.log(apiResponse.data, formData);

    res.status(200).send("Form data submitted successfully!");
  } catch (error) {
    console.error("Error submitting form data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  }

  console.log("The server is up and running on port", port);
});
