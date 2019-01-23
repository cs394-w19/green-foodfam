const express = require("express");
const yelp = require("./node_modules/yelp-fusion");
const bodyParser = require("body-parser");

// initialize fire base dependencies & secret
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomNames = ["bake", "toll", "mars", "heir", "camp", "roof", "wife", "huge", "case", "tray"];

const client = yelp.client(
  "rskD-cUIB4NnhGMykAblkUcoYVMfah1tKpbYY7jTYN6beAkHppENDnT7es0Qw-FL0mMILOJnTNTomhre1LFcJi91sO8H10hI0tx8_wpBa92jfVCFTcsgKuv0Nhw2XHYx"
);

// firebase initialization
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://foodfam-caf4c.firebaseio.com"
});
var db = firebase.database();
var ref = db.ref("/data");
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

// Creates and stores a new room entry on firebase database. returns room_code
// to front-end to share with other users
app.get("/create/room", async (req, res) => {
  try {
    // const code = Math.floor(1000 + Math.random() * 9000);
    const code = roomNames[Math.floor(Math.random() * roomNames.length)];
    res.send({ code });
    let postData = {
      category: {
        American: 0,
        Mexican: 0,
        Thai: 0
      },
      totalPrice: 0,
      users: {
      }
    };
    var ref = db.ref("/data");
    var updates = {};
    updates['/' + code] = postData;
    await ref.update(updates);

  } catch (e) {
    return res.sendStatus(400).send(e);
  }
});

app.get("/create/user", async(req, res) => {
  try {
    const userName = req.body.userName;
    const roomName = req.body.roomName;
    var updates = {};
    updates['/' + roomName + "/users/" + userName] = 0;
    await ref.update(updates);

  } catch (e) {
    return res.sendStatus(400).send(e);
  }
});

app.get("/update/preference", async(req, res) => {
  try {
    //const userName = req.body.userName;
    const roomName = req.body.roomName;
    const priceRange = req.body.priceRange;
    //const category = req.body.category;
    var updates = {};
    var prevPriceTotal = 0;
    var priceRef = db.ref("/data/" + roomName + "/totalPrice");
    var roomRef = ref.child("heir");
    
    //get previous priceTotal
    await priceRef.on("value", function(snapshot) {
      prevPriceTotal = snapshot.val();
      console.log(prevPriceTotal);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    updates["/totalPrice"] = 5;

    roomRef.update(updates);
  } catch (e) {
      //return res.sendStatus(400).send(e);
  }
});
