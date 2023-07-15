"use strict";

const { v4: uuidv4 } = require("uuid");

require(`dotenv`).config();
const port = process.env.PORT || 3000;
const io = require("socket.io")(port);

let queue = {
  flights: {},
};

io.on(`connection`, (socket) => {
  console.log("You're connected to the Server, your ID:", socket.id);

  socket.on("manager", (payload) => {
    io.emit("new-flight");
  });

  socket.on("new-flight-added", handleNewFlight);
  socket.on("arrived", handleArrivedFlight);
  socket.on("get-all-flights", handleGetAllFlights);
  socket.on("delete-flight", handleDeleteFlight);

  socket.on("disconnect", (payload) => {
    queue = {
      flights: {},
    };
  });
});

function handleNewFlight(payload) {
  const id = uuidv4();
  queue.flights[id] = {
    event: "new-flight",
    details: {
      time: new Date().toLocaleString(),
      id: id,
      pilot: payload.pilot,
      destination: payload.destination,
    },
  };
  io.emit("new-flight-added", payload);
  console.log("New Flight:", payload);
}

function handleArrivedFlight(payload) {
  io.emit("flight-arrived", payload);
  delete queue.flights[payload.flightId];
  console.log("Arrived Flight:", payload);
}

function handleGetAllFlights() {
  io.emit("flight", queue.flights);
}

function handleDeleteFlight(flightId) {
  delete queue.flights[flightId];
}

const airline = io.of("/airline");
airline.on("connection", (socket) => {
  socket.on("took-off", handleTookOffFlight);
});

function handleTookOffFlight(payload) {
  console.log("Took Off Flight:", payload);
}
