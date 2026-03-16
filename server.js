const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// In-memory "database" (clears when server restarts)
let latestSensorData = { temp: 0, tds: 0, distance: 0 };

// Endpoint for ESP32 to send data
app.post('/update-sensor', (req, res) => {
    const { temp, tds, distance } = req.body;
    latestSensorData = { temp, tds, distance, timestamp: new Date() };
    
    // Emit to all connected frontend clients
    io.emit('sensorUpdate', latestSensorData);
    
    console.log("Data received:", latestSensorData);
    res.status(200).send("Data Received");
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
