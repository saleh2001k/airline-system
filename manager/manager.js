"use strict";

const uuid = require("uuid");
const { faker } = require("@faker-js/faker");
const eventsPool = require("../events");

eventsPool.on("new-flight", flightEventHandler);

function flightEventHandler(payload) {
  console.log(`Manager: new flight with ID ${payload.Details.flightID} has been scheduled`);
}

setInterval(() => {
  const flightID = uuid.v4();
  const pilotName = faker.person.fullName();
  const destination = `${faker.location.city()}, ${faker.location.country()}`;

  eventsPool.emit("new-flight", {
    event: "new-flight",
    time: new Date().toLocaleString(),
    Details: {
      airLine: "Royal Jordanian Airlines",
      flightID: flightID,
      pilot: pilotName,
      destination: destination,
    },
  });
}, 10000);

setTimeout(() => {
  eventsPool.on("arrived", (payload) => {
    const pilotName = payload.Details.pilot;
    console.log(`Manager: we're greatly thankful for the amazing flight ${pilotName}`);
  });
}, 1000);
