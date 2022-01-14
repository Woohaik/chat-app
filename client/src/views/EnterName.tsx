import "./../styles/enter-name.css"
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterName: FC = () => {
    const navigation = useNavigate()
    const [username, setUsername] = useState("");
    const enterChat = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim() !== "") {
            navigation(`/chat?u=${username.trim()}`)
        } else {
            window.alert("Agrega nombre de usuario")
        }
    };

    return (

        <div id="name-view">
            <div className="container">
                <h1>Entra a Supra-Chat</h1>
                <h4>Ingrese nombre de usuario:</h4>
                <form onSubmit={enterChat}>
                    <input type="text" value={username} placeholder="Nombre de Usuario..." onChange={(e) => setUsername(e.target.value)} />
                    <button type="submit">Unirse</button>
                </form>
            </div>
        </div >
    )
};

export default EnterName;