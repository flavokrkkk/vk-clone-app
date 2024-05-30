import { Button, Container, TextField } from "@mui/material";
import { ChangeEventHandler, useRef, useState } from "react";
import { IMessage } from "../../models/IMessage";
import MessageList from "../MessageList/MessageList";
import { BoxForm } from "./styles";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [value, setValue] = useState("");

  const [connected, setConnected] = useState(false);

  const [username, setUsername] = useState("");

  const socket = useRef<WebSocket>();

  const sendMessage = async () => {
    const message: IMessage = {
      username,
      event: "message",
      date: new Date().toISOString(),
      message: value,
      id: Date.now(),
    };
    socket.current?.send(JSON.stringify(message));
    setValue("");
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current?.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log("Socket closed!");
    };

    socket.current.onerror = () => {
      console.log("Socket error server!");
    };
  }

  if (!connected) {
    // Вызывает функцию коннект и добавляет юзера
    return (
      <Container>
        <BoxForm>
          <TextField
            size="small"
            placeholder="Введите ваше имя"
            // юзер слайс
            value={username}
            onChange={handleChangeName}
          />
          <Button
            variant="outlined"
            // сокет слайс
            onClick={connect}
          >
            Войти
          </Button>
        </BoxForm>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <BoxForm>
          <TextField
            value={value}
            size="small"
            placeholder="Введите ваше сообщение"
            onChange={handleChangeValue}
          />
          <Button variant="outlined" onClick={sendMessage}>
            Отправить
          </Button>
        </BoxForm>
        <MessageList messages={messages} />
      </Container>
    </>
  );
};

export default Chat;
