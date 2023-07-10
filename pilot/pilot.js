"use strict";

const eventsPool = require("../events");
require("../manager/manager");

eventsPool.on("new-flight", flightEventHandler);

function flightEventHandler(payload) {
  setTimeout(() => {
    const flightID = payload.details.flightID;
    console.log(`Pilot: flight with ID ${flightID} took off`);
    
    payload.event = "took_off";
    payload.time = new Date();
    eventsPool.emit("took-off", payload);
  }, 4000);

  setTimeout(() => {
    const flightID = payload.details.flightID;
    console.log(`Pilot: flight with ID ${flightID} has arrived`);

    payload.event = "arrived";
    payload.time = new Date().toLocaleString();
    eventsPool.emit("arrived", payload);
  }, 7000);
}
