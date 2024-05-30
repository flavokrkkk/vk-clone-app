import { FC } from "react";
import { IMessage } from "../../models/IMessage";

interface MessageListPros {
  messages: IMessage[];
}

const MessageList: FC<MessageListPros> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.event === "connection" ? (
            <div>Пользователь {message.username} подключён</div>
          ) : (
            <div>
              {message.username}. {message.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
