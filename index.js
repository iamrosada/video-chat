const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", " POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("server is listening");
});

io.on("connection", (socket) => {
  socket.emit("connection", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnect", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
