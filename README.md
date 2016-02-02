# InternetOfBioMEMS

This tutorial is about controlling a BioMEMS (Biological MicroMechanical System) usig a  cloud-enabled PID controller. You will need:

  - [Microsoft Azure (cloud) account] [free azure]
  - [Arduino][arduino]: A simple microcontroller board and open-source development environment 
  - [Node.js] [node]: An open-source, cross-platform runtime environment (uses Javascript)
  - [Johnny-five] [jf]: The Javascript Robotics Programming Framework
  - [SignalR] [signalr]: An open-source library enabling persistent, bi-directional, and real-time communication across the internet
  - [Visual Studio] [vs]
  - Computer (Windows OS)
  - photoresistor (or any BioMEMS sensor compatible with Arduino)
  - LED (or any BioMEMS actuator compatible with Arduino)
  - Breadboard, wires, etc.

### Step 1: Download and install Node.js
[Node.js Downloads] (https://nodejs.org/en/download/) 

### Step 2: Install Johnny-five
Run: npm install johnny-five (npm is the package manager for node.js)

### Step 3: Setup your Arduino and run following Javascript code
''' javascript
var five = require("johnny-five"),
    board, photoresistor;

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

''' 

### Step 4: Learn how SignalR works!
[Tutorial: Getting Started with SignalR]: (http://www.asp.net/signalr) Follow the tutorial and build a sample chat app


[free azure]: <https://azure.microsoft.com/en-us/pricing/free-trial/>
[arduino]: <https://www.arduino.cc/>
[node]: <https://nodejs.org>
[jf]:<http://johnny-five.io/>
[signalr]:<http://www.asp.net/signalr>
[socket.io]:<http://www.asp.net/signalr>
[vs]: <https://www.visualstudio.com/en-us/visual-studio-homepage-vs.aspx>
[signalr tutorial]: <hhttp://www.asp.net/signalr/overview/getting-started/tutorial-getting-started-with-signalr>
