import { useContext, useState } from "react";
import MessageBox from "../MessageBox";
import { chatContext, chatMethodsContext } from "../Socket.Provider";

const Body = () => {
    const theChat = useContext(chatContext);
    const messagesFunctions = useContext(chatMethodsContext);
    const [msg, setMsg] = useState("");
    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        messagesFunctions.sendMessageToGeneralChat(msg);
        setMsg("");



    };


    return (
        <div id="app-body">
            <div className="msg-area">
                {
                    theChat.generalChat.messages.map(message => (<MessageBox username={message.user.username} body={message.body} sent={message.sent} />))
                }
            </div>
            <form className="input-area" onSubmit={sendMessage}>
                <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Escribe aquí..." />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Body;