const express = require("express");
const yelp = require("./node_modules/yelp-fusion");
const bodyParser = require("body-parser");

// initialize fire base dependencies & secret
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomNames = ["bake", "toll", "mars", "heir", "camp", "roof", "surf", "huge", "case", "tray"];

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

app.post("/create/user", (req, res) => {
  try {
    const userName = req.body.userName;
    const roomName = req.body.roomName;
    var updates = {};
    var ref = db.ref("/data");
    updates['/' + roomName + "/users/" + userName] = 0;
    ref.update(updates);

  } catch (e) {
    return res.sendStatus(400).send(e);
  }
});

app.post("/display/unfinished", async (req, res) => {
  try{
    const roomName = req.body.roomName;
    var roomRef = ref.child(roomName);
    roomRef.on("value", function(snapshot) {
      returnList = [];
      roomJSON = snapshot.val();
      //console.log(roomJSON);

      var room = JSON.parse(JSON.stringify(roomJSON));
      var users = new Map(Object.entries(room.users));
      
      users.forEach((value, key, map) => {
        if (value == 0){
          returnList.push(key);
        }
      });
      console.log(returnList);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    return res.send({ returnList });
  } catch (e) {
      //return res.sendStatus(400).send(e);
  }
});

app.post("/update/preference", async (req, res) => {
  try {
    const userName = req.body.userName;
    const roomName = req.body.roomName;
    const priceRange = req.body.priceRange;
    const category = req.body.category;
    var updates = {};
    var prevPriceTotal = 0;
    var prevCategory = 0;
    var priceRef = db.ref("/data/" + roomName + "/totalPrice");
    var categoryRef = db.ref("/data/" + roomName + "/category/" + category);
    var roomRef = ref.child(roomName);
    var returnList = [];
    //get previous priceTotal
    priceRef.on("value", function(snapshot) {
      prevPriceTotal = snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    categoryRef.on("value", function(snapshot) {
      prevCategory = snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    updates["/totalPrice"] = Number(priceRange) + Number(prevPriceTotal);
    updates["/users/" + userName] = 1;
    updates["/category/" + category] = Number(prevCategory) + 1;
    roomRef.update(updates);

    roomRef.on("value", function(snapshot) {
      returnList = [];
      roomJSON = snapshot.val();
      console.log(roomJSON);

      var room = JSON.parse(JSON.stringify(roomJSON));
      var users = new Map(Object.entries(room.users));
      
      users.forEach((value, key, map) => {
        if (value == 0){
          returnList.push(key);
        }
      });
      console.log(returnList);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    return res.send({ returnList });
    //return users who have value 0 (not finished)
  } catch (e) {
      return res.sendStatus(400).send(e);
  }
});

app.post("/result", async (req, res) => {
  try {
    const roomName = req.body.roomName;
    var roomRef = db.ref("/data/" + roomName);
    var roomJSON = {};
    var unfinished = [];
    await roomRef.on("value", function(snapshot) {

      roomJSON = snapshot.val();

      var room = JSON.parse(JSON.stringify(roomJSON));
      var category = new Map(Object.entries(room.category));
      var users = new Map(Object.entries(room.users));
      var totalPrice = room.totalPrice;
      var resCategory = "";
      resPrice = Math.round(totalPrice / users.size);
      //see if all user have finished
      var ifSend = false;
      var isFinished = true;
      users.forEach((value, key, map) => {
        if (value == 0){
          isFinished = false;
        }
      });
      //return result if all users have finished
      if(isFinished){
        var high = 0;
        category.forEach((value, key, map) => {
          if (value > high){
            high = value;
            resCategory = key;
          }
          ifSend = true;
        });
        console.log(resPrice + "  " + resCategory);
      }
      if(ifSend){
        res.send({ resPrice, resCategory });
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  } catch (e) {
    console.log(e);
    //return res.sendStatus(400).send(e);
  }
});