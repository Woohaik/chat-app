
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
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    mainConnection.on("connection", (socket) => {
        const socketID: string = socket.id; // ID de conexion

        // To emit to a specific room
        Logger.info("New Connection");

        socket.on("joinRoom", ({ username }) => {
            const user = { id: socketID, username: username };


            try {
                userMethods.userJoin(user);
                socket.join(ROOM_NAME);

                socket.broadcast
                    .to(ROOM_NAME)
                    .emit(
                        MESSAGE_TOPICS.USER_JOINS,
                        user
                    );

                // Enviar a los usuarios informacion del resto de usuarios
                mainConnection.to(ROOM_NAME).emit(MESSAGE_TOPICS.ALL_USERS, userMethods.getOnlineUsers());
            } catch (error: unknown) {
                socket.emit(MESSAGE_TOPICS.OWN_USER_ERROR, (error as Error).message);
            }
        });





        socket.on(MESSAGE_TOPICS.CHAT_MESSAGE, msg => {
            const user = userMethods.getCurrentUser(socket.id);
            mainConnection.to(ROOM_NAME).emit(MESSAGE_TOPICS.CHAT_MESSAGE, { objetoAMandar: JSON.stringify(user) + msg });
        });


        // Cuando un usuario se desconecta
        socket.on("disconnect", () => {
            const user = userMethods.userLeaves(socket.id);
            if (user) {
                mainConnection.to(ROOM_NAME).emit(
                    MESSAGE_TOPICS.USER_LEAVES, user.username
                );
            }
        });
    });

    httpServer.listen(Environments.PORT, () =>
        Logger.info(`Server on ${Environments.__ISPROD__ ? "PRODUCTION" : "DEVELOPMENT"} mode, on PORT: ${Environments.PORT}`)
    );
} catch (error: unknown) {
    Logger.error(`Server Error: ${(error as Error).message}`);
}
