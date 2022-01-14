import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { chatMethodsContext } from "../Socket.Provider";

const Navbar: FC = () => {
    const navigation = useNavigate();
    const messagesFunctions = useContext(chatMethodsContext);
    return (
        <nav id="navbar">
            <div id="app-name">
                <b>
                    Supra-chat
                </b>
            </div>
            <button onClick={() => {
                messagesFunctions.leaveChat();
                navigation("/");
            }}>Salir</button>
        </nav>
    )
}

export default Navbar;