"use strict";
//requiriendo dependencias
var mqtt = require("mqtt");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
var path = require("path");

var Opciones = {
  host: "broker.emqx.io",
  port: 1883,
  protocol: "mqtt",
  clientId: "YoCodigo1",
};

var client = mqtt.connect(Opciones);
client.on("connect", () => {
  client.subscribe("ViToKo/#", function (err) {
    if (!err) {
      client.publish("ViToKo/Status", JSON.stringify({ Status: "OK" }));
    }
  });
});

client.on("message", (topic, message) => {
  var Data = JSON.parse(message);
  console.log(topic);
  console.log(Data);
  if (topic == "ViToKo/Data") {
    io.emit("Data", Data);
  }
  // client.end()
});

const app = express(); //instancia de express
const server = http.createServer(app); //creando el server con http y express como handle request
const io = socketio(server); //iniciando el server de socket.io
const PORT = process.env.PORT || 3000;
var contador = 0;
//corriendo el servidor
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

//escuchando el evento connection
io.on("connection", function (socket) {
  //imprimiendo el id del cliente conectado
  console.log(`client: ${socket.id}`);
});

io.on("connection", function (socket) {
  console.log(`client: ${socket.id}`);
  socket.on("client/random", (num) => {
    console.log(num);
  });
});

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed();
}
app.use(express.static(path.join(__dirname, "public"))); //middleware de express para archivos estaticos
