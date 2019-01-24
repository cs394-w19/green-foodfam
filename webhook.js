const sec = "UujebFx9BnEugWi";
const http = require("http");
const crypto = require("crypto");
const exec = require("child_process").exec;

http
  .createServer((req, res) => {
    req.on("data", chunk => {
      let sig =
        "sha1=" +
        crypto
          .createHmac("sha1", sec)
          .update(chunk.toString())
          .digest("hex");

      if (req.headers["x-hub-signature"] == sig) {
        exec("screen -XS server quit && screen -XS front quit");
        exec("git pull", { cwd: "/home/ec2-user/green-foodfam" });
        exec("npm-install-missing", { cwd: "~/green-foodfam" });
        exec("npm-install-missing", { cwd: "~/green-foodfam/client" });
        exec("screen -dmS server node server.js", { cwd: "~/green-foodfam" });
        exec("screen -dmS front npm start", { cwd: "~/green-foodfam/client" });
        console.log("now serving updated app");
      }
    });

    res.end();
  })
  .listen(8080);
