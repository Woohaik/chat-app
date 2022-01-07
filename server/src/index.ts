
import { Environments, Logger } from "./Config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

try {
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket) => {
        // Theres a socker id

        socket.id

        socket.join("Room uid") // Join room 
        socket.leave("Room id") // Leave room


        // To emit to a specific room

        socket.broadcast.to("rodfgom id").emit("message", "xd")

        console.log("Conntection");
        // Welcome the user
        socket.emit("messagee", "welcome to chat xd");
        // Broadcast when a user connects
        socket.broadcast.emit("Nuevo Usario Conectado"); // Emits everybody except the user connecting
        // Broadcast when disconnects
        socket.on("disconnect", () => {
            io.emit("message", "User has left the chat") // Emits everybody except the user connecting
        });


        // Listen for Chatmessages
        socket.on("chatMessage", (message) => {
            io.emit("message", message)
        });

    });

    httpServer.listen(Environments.PORT, () => {
        Logger.info(`Server on ${Environments.__ISPROD__ ? "PRODUCTION" : "DEVELOPMENT"} mode, on PORT: ${Environments.PORT}`);
    });
} catch (error: unknown) {
    Logger.error(`Server Error: ${(error as Error).message}`)
}
