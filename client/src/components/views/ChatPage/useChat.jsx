import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { SERVER_BASE_URL } from "../../Config";

const NEW_CHAT_MESSAGE_EVENT = "Input chat message";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  console.log(socketRef)  
  useEffect(() => {
    socketRef.current = socketIOClient(SERVER_BASE_URL);

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;