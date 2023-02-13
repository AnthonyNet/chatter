import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";


export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [userX, setUserX] = useState(null);

  useEffect(() => {
    setUserX(prompt('Zadej jméno:'))
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userX,
      room,
    });

    setNewMessage("");
  };

  return (
    <section className="chat-app w-[100vw] h-screen flex items-center justify-center p-8 border-4 mainSection">
  <div className="h-full w-full flex flex-col justify-between items-center border-4 ">
  <div className="header">
        <h2 className="text-3xl">Vítej v: {room.toUpperCase()}</h2>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message border-4">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Napiš zprávu..."
        />
        <button type="submit" className="send-button anime border-2">
          Send
        </button>
      </form>
  </div>
    </section>
  );
};

export default Chat;