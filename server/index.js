const ws = require("ws");

const wss = new ws.Server(
  {
    port: 5000,
  },
  () => {
    console.log(`Server started on port 5000`);
  }
);

//Подписываемся на событие подключение
wss.on("connection", function connection(ws) {
  ws.on("message", function () {});
});
