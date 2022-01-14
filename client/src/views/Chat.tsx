import "./../styles/chat.css";
import { FC } from "react";
import Body from "../components/Layout/Body";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import SocketProvider from "../components/Socket.Provider";

const Chat: FC = () => {
    return (
        <div className="App" id="chat-app">
            <SocketProvider>
                <Navbar />
                <div id="app">
                    <Sidebar />
                    <Body />
                </div>
            </SocketProvider>
        </div>
    )
}

export default Chat;