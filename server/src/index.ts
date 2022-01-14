
import { Environments, Logger } from "./Config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { userMethods } from "./Data";
import { MESSAGE_TOPICS, ROOM_NAME } from "./Config/Constants";

try {
    const app = express();
    const httpServer = createServer(app);

    const mainConnection = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Cuando se cree una nueva conexxion 
    mainConnection.on("connection", (socket) => {
        const socketID: string = socket.id; // ID de conexion

        // To emit to a specific room
        Logger.info("New Connection");

        socket.on("joinRoom", ({ username }) => {
            const user = { id: socketID, username: username };
            try {
                userMethods.userJoin(user); // Guardando al usuario el array

                socket.emit(
                    MESSAGE_TOPICS.CHAT_MESSAGE,
                    { user: { username: "???", id: "???" }, sent: new Date().toISOString(), body: "Bienvenido a Supra-Chat!!" }
                ); // Dando la bienvenida al usuarios

                socket.join(ROOM_NAME); // Room a enviar los mensages (Solo hay uno)

                socket.broadcast
                    .to(ROOM_NAME)
                    .emit(
                        MESSAGE_TOPICS.USER_JOINS,
                        {
                            sent: new Date().toISOString() // La fecha de ahora en formato ISO
                            , user
                        }
                    ); // Enviar a todos los usuarios los usuarios conectados

                // Enviar a los usuarios informacion del resto de usuarios
                mainConnection.to(ROOM_NAME).emit(MESSAGE_TOPICS.ALL_USERS, userMethods.getOnlineUsers());
            } catch (error: unknown) {
                socket.emit(MESSAGE_TOPICS.OWN_USER_ERROR, (error as Error).message);
            }
        });


        // Cuando algun usuario envia un mensaje
        socket.on(MESSAGE_TOPICS.CHAT_MESSAGE, msg => {
            const user = userMethods.getCurrentUser(socket.id); // Obtener quien envia el mensaje
            const payload = { user, sent: new Date().toISOString(), body: msg };
            mainConnection.to(ROOM_NAME).emit(MESSAGE_TOPICS.CHAT_MESSAGE, payload); // Emitir el mensaje a todos
            Logger.info(JSON.stringify(user));
        });


        // Cuando un usuario se desconecta
        socket.on("disconnect", () => {
            const user = userMethods.userLeaves(socket.id) ?? { username: "error", id: "error" };
            if (user) {
                mainConnection.to(ROOM_NAME).emit(
                    MESSAGE_TOPICS.USER_LEAVES, {
                    sent: new Date().toISOString() // La fecha de ahora en formato ISO
                    , user
                }
                );
                mainConnection.to(ROOM_NAME).emit(MESSAGE_TOPICS.ALL_USERS, userMethods.getOnlineUsers()); // Enviar los usuarios conectados para que los demas actualizen
            }
        });
    });

    httpServer.listen(Environments.PORT, () =>
        Logger.info(`Server on ${Environments.__ISPROD__ ? "PRODUCTION" : "DEVELOPMENT"} mode, on PORT: ${Environments.PORT}`)
    );
} catch (error: unknown) {
    Logger.error(`Server Error: ${(error as Error).message}`);
}
