
import { createContext, FC, useEffect, useState } from 'react';
import { MESSAGE_TOPICS } from "../constants";
import { useLocation } from "react-router-dom";
import socket from '../Socket';

interface IUser {
    username: string;
    id: string;
}

interface IChat {
    messages: { user: IUser, sent: string, body: string }[]
}

interface IChatContext {
    users: IUser[],
    generalChat: IChat
}

export const chatContext = createContext<IChatContext>({ users: [], generalChat: { messages: [] } });
export const chatMethodsContext = createContext({ sendMessageToGeneralChat: (message: string) => { }, leaveChat: () => { } });

const SocketProvider: FC = (props) => {
    const search = useLocation().search;
    const username = new URLSearchParams(search).get('u');
    const [users, setUsers] = useState<IUser[]>([]);
    const [generalChat, setGeneralChat] = useState<IChat>({ messages: [] });

    useEffect(() => {
        socket.connect()
        socket.emit('joinRoom', { username: username });
    }, []);

    useEffect(() => {
        // TODO SOlo emitir esto si no esta ""LOGUEADO"""
        socket.on(MESSAGE_TOPICS.CHAT_MESSAGE, message => {

            const lastMessages = generalChat.messages;
            lastMessages.push(message);
            setGeneralChat(() => ({ messages: lastMessages }));

        });

        socket.on(MESSAGE_TOPICS.USER_JOINS, payload => {
            const lastMessages = generalChat.messages;
            lastMessages.push({ user: { username: "???", id: "???" }, sent: payload.sent, body: `Nuevo Usuario Connectado: ${payload.user.username}` });
            setGeneralChat(() => ({ messages: lastMessages }));
        });

        socket.on(MESSAGE_TOPICS.USER_LEAVES, payload => {
            const lastMessages = generalChat.messages;
            lastMessages.push({ user: { username: "???", id: "???" }, sent: payload.sent, body: `${payload.user.username} ha salido del chat` });
            setGeneralChat(() => ({ messages: lastMessages }));
        });

        socket.on(MESSAGE_TOPICS.ALL_USERS, users => {
            updateUsersInChat(users)
        });

        socket.on(MESSAGE_TOPICS.OWN_USER_ERROR, message => {
            console.error("ERROR", message)
        });
    }, []);


    const updateUsersInChat = (newUsers: IUser[]) => {
        setUsers(() => newUsers);
    };

    const sendMessageToGeneralChat = (message: string) => {
        socket.emit(MESSAGE_TOPICS.CHAT_MESSAGE, message)
    };

    const leaveChat = () => {
        socket.disconnect()
    }

    return (
        <chatContext.Provider
            value={{
                users,
                generalChat
            }}
        >
            <chatMethodsContext.Provider
                value={{
                    sendMessageToGeneralChat,
                    leaveChat
                }}
            >
                {props.children}
            </chatMethodsContext.Provider>
        </chatContext.Provider >)
};


export default SocketProvider;
