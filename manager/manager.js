"use strict";

const uuid = require("uuid");
const { faker } = require("@faker-js/faker");
require('dotenv').config();
const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;
const io = require('socket.io-client');
const socket = io.connect(host);

socket.on('new-flight', handleNewFlight);
socket.on('flight-arrived', greetFlight);

function handleNewFlight(payload) {
  setInterval(() => {
    const flightID = uuid.v4();
    const pilotName = faker.person.fullName();
    const destination = `${faker.location.city()}, ${faker.location.country()}`;
    const flight = {
      event: "new-flight",
      time: new Date().toLocaleString(),
      Details: {
        airLine: "Royal Jordanian Airlines",
        flightID: flightID,
        pilot: pilotName,
        destination: destination,
      },
    };
    console.log(`Manager: New flight with ID ${flight.Details.flightID} has been scheduled`);
    socket.emit("new-flight-added", flight);
  }, 10000);
}

function greetFlight(payload) {
  setTimeout(() => {
    const pilotName = payload.Details.pilot;
    console.log(`Manager: We're greatly thankful for the amazing flight ${pilotName}`);
  }, 1000);
}
