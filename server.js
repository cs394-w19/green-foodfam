const express = require("express");
const app = express();
const yelp = require("./node_modules/yelp-fusion");
const client = yelp.client(
  "rskD-cUIB4NnhGMykAblkUcoYVMfah1tKpbYY7jTYN6beAkHppENDnT7es0Qw-FL0mMILOJnTNTomhre1LFcJi91sO8H10hI0tx8_wpBa92jfVCFTcsgKuv0Nhw2XHYx"
);

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "From server: Express backend connected! hello world" });
});

app.get("/restaurant/info", (req, res) => {
  client
    .search({
      term: "restaurant",
      location: "evanston, il"
    })
    .then(response => {
      const joints = response.jsonBody.businesses;
      res.send({ choice: joints[0] });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// //simple search by term and location
// client
//   .search({
//     term: "restaurant",
//     location: "evanston, il"
//   })
//   .then(response => {
//     const joints = response.jsonBody.businesses;
//     joints.forEach(item => {
//       console.log(item.name);
//     });
//   })
//   .catch(e => {
//     console.log(e);
//   });
