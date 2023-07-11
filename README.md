# Airline System


### UML :
![UML](UML.png)

#### [PR](https://github.com/saleh2001k/airline-system/pull/2)
### Output:

```bash
Manager: new flight with ID '6syze4b5t1' has been scheduled
Flight {
  event: 'new-flight',
  time: 07/10/2023, 03:18:41 PM,
  Details: {
    airLine: 'Royal Jordanian Airlines',
    flightID: '6syze4b5t1',
    pilot: 'lalo salmnca',
    destination: 'New York, USA'
  }
}
Pilot: flight with ID '6syze4b5t1' took-off
Flight {
  event: 'took-off',
  time: 07/10/2023, 03:18:45 PM,
  Details: {
    airLine: 'Royal Jordanian Airlines',
    flightID: '6syze4b5t1',
    pilot: 'lalo salmnca',
    destination: 'undefined'
  }
}
Pilot: flight with ID '6syze4b5t1' has arrived
Flight {
  event: 'arrived',
  time: 07/10/2023, 03:18:48 PM,
  Details: {
    airLine: 'Royal Jordanian Airlines',
    flightID: '6syze4b5t1',
    pilot: 'lalo salmnca',
    destination: 'undefined'
  }
}
Manager: we're greatly thankful for the amazing flight, lalo salmnca



```