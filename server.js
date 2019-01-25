const express = require("express");
const yelp = require("./node_modules/yelp-fusion");
const bodyParser = require("body-parser");

// initialize fire base dependencies & secret
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomNames = [
  "bake",
  "toll",
  "mars",
  "heir",
  "camp",
  "roof",
  "surf",
  "huge",
  "case",
  "tray"
];

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

yelpRequest = async (location, price, categories) => {
  try {
    const response = await client.search({
      term: "restaurant",
      location,
      price,
      categories,
      open_now: true
    });
    const restaurant = response.jsonBody.businesses[0];
    console.log(response);
    return restaurant;
  } catch (err) {
    console.log(err);
  }
};

// Creates and stores a new room entry on firebase database. returns room_code
// to front-end to share with other users
app.post("/create/room", async (req, res) => {
  try {
    const location = req.body.location;
    const code = roomNames[Math.floor(Math.random() * roomNames.length)];

    let postData = {
      category: {
        American: 0,
        Mexican: 0,
        Thai: 0
      },
      location: location,
      totalPrice: 0,
      users: {}
    };
    var ref = db.ref("/data");
    var updates = {};
    updates["/" + code] = postData;
    await ref.update(updates);
    res.send({ code });
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.post("/create/user", (req, res) => {
  try {
    const userName = req.body.userName;
    const roomName = req.body.roomName;
    var updates = {};
    var ref = db.ref("/data");
    updates["/" + roomName + "/users/" + userName] = 0;
    ref.update(updates);
    res.send({ status: "ok!" });
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.post("/display/unfinished", async (req, res) => {
  try {
    const roomName = req.body.roomName;
    var roomRef = ref.child(roomName);
    roomRef.on(
      "value",
      function(snapshot) {
        returnList = [];
        roomJSON = snapshot.val();
        //console.log(roomJSON);

        var room = JSON.parse(JSON.stringify(roomJSON));
        var users = new Map(Object.entries(room.users));

        users.forEach((value, key, map) => {
          if (value == 0) {
            returnList.push(key);
          }
        });
        console.log(returnList);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    res.send({ returnList });
  } catch (e) {
    res.status(400).send(e);
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
    priceRef.on(
      "value",
      function(snapshot) {
        prevPriceTotal = snapshot.val();
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    categoryRef.on(
      "value",
      function(snapshot) {
        prevCategory = snapshot.val();
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    updates["/totalPrice"] = Number(priceRange) + Number(prevPriceTotal);
    updates["/users/" + userName] = 1;
    updates["/category/" + category] = Number(prevCategory) + 1;
    roomRef.update(updates);

    roomRef.on(
      "value",
      function(snapshot) {
        returnList = [];
        roomJSON = snapshot.val();
        console.log(roomJSON);

        var room = JSON.parse(JSON.stringify(roomJSON));
        var users = new Map(Object.entries(room.users));

        users.forEach((value, key, map) => {
          if (value == 0) {
            returnList.push(key);
          }
        });
        console.log(returnList);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    res.send({ returnList });
    //return users who have value 0 (not finished)
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});
function checkFinished(roomName) {
  return new Promise((resolve, reject) => {
    var isCompleted = false;
    var roomRef = db.ref("/data/" + roomName);

    var timer = setInterval(async () => {
      if (!isCompleted) {
        try {
          console.log("interval for another second!");
          var room_snapshot = await roomRef.once("value");
          var room_data = room_snapshot.val();
          var now_completed = true;
          Object.values(room_data.users).forEach(user => {
            if (user === 0) {
              now_completed = false;
            }
          });

          if (now_completed) {
            isCompleted = true;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        clearInterval(timer);
        resolve(isCompleted);
      }
    }, 1000);
  });
}

function pleaseHoldFor(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

app.post("/result", async (req, res) => {
  try {
    const isOwner = req.body.isOwner;
    const roomName = req.body.roomName;
    var roomRef = db.ref("/data/" + roomName);

    const isCompleted = await checkFinished(roomName);

    console.log("we got out of the interval!");
    if (isCompleted) {
    }

    const yelp_snapshot = await roomRef.child("yelpData").once("value");

    if (!yelp_snapshot.exists()) {
      // If yelpData doesnt exist on firebase
      // We need to check if is owner to update firebase
      if (isOwner) {
        // If is owner, let's update!
        const snapshot = await roomRef.once("value");
        data = snapshot.val();
        const category = Object.keys(data.category).reduce((a, b) =>
          data.category[a] > data.category[b] ? a : b
        );

        const totalUsers = Object.keys(data.users).length;
        const location = data.location;
        const price = data.totalPrice / totalUsers;
        const yelpData = await yelpRequest(location, price, category);
        roomRef.update({ yelpData });
      } else if (!isOwner) {
        await pleaseHoldFor(3000);
      }
    }
    const yelp_snapshot_new = await roomRef.child("yelpData").once("value");

    if (yelp_snapshot_new.exists()) {
      res.send({ result: yelp_snapshot_new.val() });
    } else {
      res
        .status(400)
        .send({ error: "the yelp data does not exist on firebase" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
