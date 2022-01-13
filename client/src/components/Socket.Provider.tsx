import { io } from "socket.io-client";
import { createContext, FC, useEffect, useState } from 'react';
import { MESSAGE_TOPICS } from "../constants";

interface IUser {
    username: string;
    id: string;
}

interface IChat {
    name: string, messages: { user: IUser, body: string }[]
}

interface IChatContext {
    users: IUser[],
    chats: IChat[]
}

export const chatContext = createContext<IChatContext>({ users: [], chats: [] });

const SocketProvider: FC = (props) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [chats, setChats] = useState<IChat[]>([{ name: "GENERAL", messages: [] }]);

    const updateUsersInChat = (newUsers: IUser[]) => {
        setUsers(() => newUsers);
    }


    useEffect(() => {
        const socket = io("http://localhost:4000");
        // TODO SOlo emitir esto si no esta ""LOGUEADO"""
        socket.emit('joinRoom', { username: "Perro" });

        socket.on(MESSAGE_TOPICS.CHAT_MESSAGE, message => {
            console.log("CHAT MESSAGE", message)
        });


        socket.on(MESSAGE_TOPICS.USER_JOINS, message => {

            console.log("USER Joins", message)
        });


        socket.on(MESSAGE_TOPICS.USER_LEAVES, message => {
            console.log("User Leave", message)
        });

        socket.on(MESSAGE_TOPICS.ALL_USERS, users => {
            console.log("ALL Users", users)
            updateUsersInChat(users)

        });

        socket.on(MESSAGE_TOPICS.OWN_USER_ERROR, message => {
            console.log("ERROR", message)
        });

    }, []);

    return (
        <chatContext.Provider value={{
            users,
            chats
        }}>
            {props.children}
        </chatContext.Provider>)
};


export default SocketProvider;