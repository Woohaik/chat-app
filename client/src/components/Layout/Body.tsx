import { useContext } from "react";
import { chatContext } from "../Socket.Provider";

const Body = () => {
    const simon = useContext(chatContext)
    return (
        <div id="app-body">
            <div className="msg-area">
                <div className="message-box">
                    <div className="message-name">
                        <b>Minecraft </b>
                        <div className="message-sent">
                            12/15/22 12: 15
                        </div>
                    </div>
                    <div className="message-content">
                        {JSON.stringify(simon)}
                    </div>
                </div>
                <div className="message-box">
                    <div className="message-name">
                        <b>Minecraft </b>
                        <div className="message-sent">
                            12/15/22 12: 15
                        </div>
                    </div>
                    <div className="message-content">
                        Hola papus que tal Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quisquam, distinctio vel labore eaque cumque architecto, ducimus optio aspernatur quod odio consequatur consequuntur id? Alias quisquam quibusdam atque perspiciatis tempore?
                    </div>
                </div>
            </div>
            <div className="input-area">
                <input type="text" />
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default Body;