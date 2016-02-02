using System;
using System.Web;
using Microsoft.AspNet.SignalR;
namespace ArduinoHub
{
    public class ArduinoHub : Hub
    {
        public void Send(string sensor_val)
        {
            // simple P controller
            // control signal for LED should be between 0 and 255
            doubble Kp = 1; // Kp
            double reference = 600;  
            double maxSensor = 1023; // sensor input data range: 0 - 1023
            double sensorValue = Convert.ToDouble(sensor_val);
            double error = reference - sensorValue; //error range: 0 - 1023
            double controlValue = error/maxSensor * Kp * 255; // error/maxSensor range: 0 - 1
            if (controlValue < 0) controlValue = 0;  // lower limit for control signal
            if (controlValue > 255) controlValue = 255; // upper limit for control signal

            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(sensor_val, control);
        }
    }
}
