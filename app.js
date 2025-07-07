const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location",{id:socket.id,...data})
  });
  console.log("connected",socket.id);
  socket.on("disconnect",function(){
    io.emit("user-disonnected",socket.id)
  })
});
app.get("/", function (req, res) {
  res.render("index");
});
const PORT=3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
