"use strict";

const eventsPool = require("./events");

require("./manager/manager");
require("./pilot/pilot");

eventsPool.on("new-flight", handleNewFlight);
eventsPool.on("took-off", handleTookOffFlight);
eventsPool.on("arrived", handleArrivedFlight);

function handleNewFlight(payload) {
  console.log("New Flight:", payload);
}

function handleTookOffFlight(payload) {
  console.log("Took Off Flight:", payload);
}

function handleArrivedFlight(payload) {
  console.log("Arrived Flight:", payload);
}
