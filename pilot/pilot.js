"use strict";

require("dotenv").config();
const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;
const hostAirline = `http://localhost:${port}/airline`;

const io = require("socket.io-client");
const socket = io.connect(host);
const socketTakeOff = io.connect(hostAirline);

socket.on("new-flight-added", flightEventTakeOff);
socket.on("new-flight-added", flightEventArrived);

function flightEventTakeOff(payload) {
  setTimeout(() => {
    const flightID = payload.Details.flightID;
    console.log(`Pilot: Flight with ID ${flightID} took off`);

    payload.event = "took-off";
    payload.time = new Date().toLocaleString();
    socketTakeOff.emit("took-off", payload);
  }, 4000);
}

function flightEventArrived(payload) {
  setTimeout(() => {
    const flightID = payload.Details.flightID;
    console.log(`Pilot: Flight with ID ${flightID} has arrived`);

    payload.event = "arrived";
    payload.time = new Date().toLocaleString();
    socket.emit("arrived", payload);
  }, 7000);
}
