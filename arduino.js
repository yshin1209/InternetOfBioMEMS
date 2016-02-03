// arduino.js
var five = require("johnny-five"), board = new five.Board();

var io = require('socket.io')(8000);

board.on("ready", function() {

    // Create a new BioMEMS sensor (photoresistor) instance.
    sensor = new five.Sensor({
        pin: "A0", // Arduino analog input pin number
        freq: 500  // Sampling frequency (500 milliseconds = 2 Hz)
    });

    // When a new sensor value is avaiable ("data"), execute {}
    sensor.on("data", function() {
        console.log(this.value); // Show the sensor value on Windows Command Shell
        io.emit('sensorValue', this.value); //Send the sensor value named "sensorValue" to the web client (e.g., sensorValue: 300)
    });

    // Create a new BioMEMS actuator (LED) instance on pin 11
    var actuator = new five.Led(11);
    io.on('connection', function(socket){
        // When the control value is received from the web client, execute {}
        socket.on('control', function(controlValue){
            actuator.brightness(controlValue); //Change the LED brightness to "controlValue"
        });
    });
});
