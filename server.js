// server.js
var five = require("johnny-five"),
    board, sensor;

board = new five.Board();

var io = require('socket.io')(8000);

board.on("ready", function() {

    // Create a new BioMEMS sensor instance.
    sensor = new five.Sensor({
        pin: "A0", // Arduino analog input pin number
        freq: 500  // 500 milliseconds = 2 Hz
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: sensor
    });

    sensor.on("data", function() {
        console.log(this.value);
        io.emit('sensing', this.value); //send the data to the browser
    });

    var actuator = new five.Led(11);
    io.on('connection', function(socket){
        socket.on('control', function(value){
            actuator.brightness(value);
        });
    });
});
