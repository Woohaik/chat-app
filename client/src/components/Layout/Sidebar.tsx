import { useContext } from "react";
import { chatContext } from "../Socket.Provider";

const Sidebar = () => {
    const theChat = useContext(chatContext);

    return (
        <div id="sidebar">
            <div className="chat">
                General
            </div>
            <h4>
                Usuarios Conectados:
            </h4>
            <div className="users">
                {theChat.users.map(user => (
                    <div className="user ">{user.username}</div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar;