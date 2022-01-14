import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDateElements } from "../utils";

interface IProps {
    username: string;
    sent: string; // ISO string
    body: string;
}


const MessageBox: FC<IProps> = (props: IProps) => {
    const search = useLocation().search;
    const username = new URLSearchParams(search).get('u');
    const navigation = useNavigate();
    if (!username) navigation("/");

    const dateParser = (date: string) => {
        const { day, month, year, hour, minutes } = getDateElements(new Date(date));
        return `${day}/${month}/${year} ${hour}:${minutes}`;
    };

    return (
        <div className="message-box" style={{ "flexDirection": username === props.username ? "row-reverse" : "row", "justifyContent": props.username === "???" ? "center" : "unset" }}>

            {
                props.username !== "???" // ??? Significa que es un mensaje del servidor
                && (<div className="message-name">
                    <b>{props.username ?? " - Error"}</b>
                    <div className="message-sent">
                        {dateParser(props.sent)}
                    </div>
                </div>
                )
            }
            <div className="message-content">
                {props.body}
            </div>
        </div>
    );
};

export default MessageBox;