const express = require("express");
const yelp = require("./node_modules/yelp-fusion");
const bodyParser = require("body-parser");

// initialize fire base dependencies & secret
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const roomNames = [
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
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
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
    console.log("52response " + response);
    return restaurant;
  } catch (err) {
    // Temporary error handling for now.
    // TODO: Fix error handling so not static
    setTimeout(() => {
      yelpRequest("evanston", 1, "american");
    }, 1000);
  }
};

// Creates and stores a new room entry on firebase database. returns room_code
// to front-end to share with other users
app.post("/create/room", async (req, res) => {
  try {
    const location = req.body.location;
    const code = await roomNames[Math.floor(Math.random() * roomNames.length)];

    let postData = {
      category: {
        American: 0,
        Mexican: 0,
        Thai: 0,
        Chinese: 0,
        Indian: 0,
        Korean: 0,
        Seafood: 0,
        Vegetarian: 0,
        Japanese: 0
      },
      location: location,
      totalPrice: 0,
      users: {},
      count: 0
    };
    var ref = db.ref("/data");
    var updates = {};
    updates["/" + code] = postData;
    await ref.update(updates);
    res.send({
      code
    });
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

app.post("/create/user", async (req, res) => {
  try {
    var userName = "";
    var roomName = req.body.roomName;
    var roomCount = null;
    var updates = {};
    var ref = db.ref("/data");
    var roomRef = ref.child(roomName);
    if (req.body.userName === null || req.body.userName === undefined) {
      userName = makeid();
      console.log(userName);
    } else {
      userName = req.body.userName;
    }
    updates["/" + roomName + "/users/" + userName] = 0;
    await roomRef.child("count").once("value", snapshot => {
      roomCount = snapshot.val() + 1;
    });
    updates["/" + roomName + "/count"] = roomCount;
    await ref.update(updates);
    res.send({
      userName
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

app.post("/display/unfinished", async (req, res) => {
  try {
    const roomName = req.body.roomName;
    var roomRef = ref.child(roomName);
    roomRef.on(
      "value",
      function (snapshot) {
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
        console.log("123 returnList: " + returnList);
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    res.send({
      returnList
    });
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
      function (snapshot) {
        prevPriceTotal = snapshot.val();
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    categoryRef.on(
      "value",
      function (snapshot) {
        prevCategory = snapshot.val();
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    updates["/totalPrice"] = Number(priceRange) + Number(prevPriceTotal);
    updates["/users/" + userName] = 1;
    updates["/category/" + category] = Number(prevCategory) + 1;
    await roomRef.update(updates);

    res.send({
      down: true
    });
    //return users who have value 0 (not finished)
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

// A nice little function which checks if firebase users
// have completed their preferences
// if everyone has then we return a resolved boolean value
// and break out of the interval function
checkFinished = roomName => {
  return new Promise((resolve, reject) => {
    var isCompleted = false;
    const roomRef = db.ref("/data/" + roomName);

    // SetInterval repeatedly calls the callback function on a time interval
    // in milliseconds
    var timer = setInterval(async () => {
      if (!isCompleted) {
        try {
          var room_snapshot = await roomRef.once("value");
          var room_data = room_snapshot.val();
          var temp = true;
          Object.values(room_data.users).forEach(user => {
            if (user === 0) {
              temp = false;
            }
          });

          if (temp) {
            isCompleted = true;
          }
        } catch (e) {
          reject(e);
        }
      } else {
        // We want to break out of the setInterval function when users are completed
        clearInterval(timer);
        resolve(isCompleted);
      }
    }, 1000);
  });
};

// A function to wait X amount of time before returning a resolved promise
// with value boolean true
pleaseHoldFor = milliseconds => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
};

app.post("/result", async (req, res) => {
  try {
    const { isOwner, roomName } = req.body;
    // Get a reference of the room firebase
    const roomRef = db.ref("/data/" + roomName);

    // We need to first check if everyone has finished filling out the firebase data
    const usersFinished = await checkFinished(roomName);

    // If that is true, then we continue
    if (usersFinished) {
      const yelp_snapshot = await roomRef.child("yelpData").once("value");

      // Next, we take a look at the yelpData key to see if it exists
      if (!yelp_snapshot.exists()) {
        // If yelpData doesnt exist on firebase
        // We need to check if is owner to update firebase
        if (isOwner) {
          // If is owner, let's update!
          const snapshot = await roomRef.once("value");

          // Extract the data from the room reference
          const data = snapshot.val();

          // find the category that is selected most frequently on firebase
          const category = Object.keys(data.category).reduce((a, b) =>
            data.category[a] > data.category[b] ? a : b
          );

          // Find the total number of users on firebase
          const totalUsers = Object.keys(data.users).length;

          // Get the location from firebase
          const location = data.location;

          // Yelp does not accept floats, so round down fractions.
          const price = Math.floor(data.totalPrice / totalUsers);

          // Make a request to the yelp api
          const yelpData = await yelpRequest(location, price, category);

          // Update the database with the new key yelpData
          roomRef.update({ yelpData });
        } else if (!isOwner) {
          // If the current user is not the owner, then we simply have them wait
          // two seconds while the owner updates the firebase yelpData
          await pleaseHoldFor(2000);
        }
      }

      const yelp_snapshot_new = await roomRef.child("yelpData").once("value");
      // Now we can finally check if the new snapshot is initalized
      if (yelp_snapshot_new.exists()) {
        // if so we send off to the front end and everyone's happy!
        res.send({
          result: yelp_snapshot_new.val()
        });
      } else {
        // Else we know that the yelpData key must not exist
        throw "the yelp database does not exist on firebase";
      }
    } else {
      // Else we know that everyone must not be finished yet
      throw "Everyone is not finished still";
    }
  } catch (e) {
    // Catch any errors we may have thrown previously and send the results to
    // front-end for error checking
    res.status(400).send(e);
  }
});
