const express = require("express");

const yelp = require("./node_modules/yelp-fusion");
const bodyParser = require("body-parser");

const client = yelp.client(
  "rskD-cUIB4NnhGMykAblkUcoYVMfah1tKpbYY7jTYN6beAkHppENDnT7es0Qw-FL0mMILOJnTNTomhre1LFcJi91sO8H10hI0tx8_wpBa92jfVCFTcsgKuv0Nhw2XHYx"
);

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/restaurant/select", (req, res) => {
  const location = req.body.location;
  client
    .search({
      term: "restaurant",
      location: location
    })
    .then(response => {
      const joints = response.jsonBody.businesses;
      res.send({ selection: joints[0] });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});
