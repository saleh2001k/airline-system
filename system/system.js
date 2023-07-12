"use strict";
require(`dotenv`).config();
const port = process.env.PORT || 3000;
const io = require("socket.io")(port);

io.on(`connection`, (socket) => {
  console.log("Your connected to the Server, your ID:", socket.id);

  io.emit("new-flight");

  socket.on("new-flight-added", handleNewFlight);
  socket.on("arrived", handleArrivedFlight);
});

function handleNewFlight(payload) {
  io.emit('new-flight-added' ,payload)
  console.log("New Flight:", payload);
}

function handleTookOffFlight(payload) {
  console.log("Took Off Flight:", payload);
}

function handleArrivedFlight(payload) {
  io.emit('flight-arrived', payload)
  console.log("Arrived Flight:", payload);
}

const airline = io.of("/airline");
airline.on("connection", (socket) => {
  socket.on("took-off", handleTookOffFlight);
});