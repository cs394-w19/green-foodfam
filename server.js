const express = require("express");
const yelp = require("./node_modules/yelp-fusion");
const bodyParser = require("body-parser");

const client = yelp.client(
  "rskD-cUIB4NnhGMykAblkUcoYVMfah1tKpbYY7jTYN6beAkHppENDnT7es0Qw-FL0mMILOJnTNTomhre1LFcJi91sO8H10hI0tx8_wpBa92jfVCFTcsgKuv0Nhw2XHYx"
);

const port = process.env.PORT || 5000;
const app = express();

// Setting up middleware for retrieving data from front-end
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// POST route which returns a restaurant
// It takes in the location data and makes an API request to Yelp before returning to front-end
app.post("/restaurant/select", async (req, res) => {
  try {
    const location = req.body.location;
    const response = await client.search({
      term: "restaurant",
      location: location
    });
    res.send({ selection: response.jsonBody.businesses[0] });
  } catch (e) {
    return res.status(400).send(e);
  }
});
