import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
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
  setUserX(prompt("Zadej jméno:"));
  console.log(userX)
userX===""||userX===" "||userX===null  && setUserX("Anonym");
  }, []);
/*
  useEffect(() => {
    userX===""||userX===" " && setUserX("Anonym");
  }, [userX]); */


  useEffect(() => {
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
      //console.log(messages);
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
    <section className="chat-app w-[100vw] h-screen flex items-center justify-center sm:p-8  mainSection">
      <div className="h-full w-full flex flex-col justify-between items-center sm:border-4 m-auto">
        <div className="header flex justify-around w-full">
          <h2 className="text-3xl">Vítej v: {room.toUpperCase()}</h2>
          <h2>Tvoje jméno: {userX}</h2>
        </div>
        <div className="messages h-[85vh] w-full overflow-auto flex flex-col p-2 text-xl border-4 border-white bg-black">
          {messages
            .slice(0)
            .reverse()
            .map((message) => (
              <div key={message.id} className="message">
                <span className="user">{message.user}:</span> {message.text}
              </div>
            ))}
        </div>

 
        <form
          onSubmit={handleSubmit}
          className="new-message-form flex justify-center"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input max-w-[60%] sm:max-w[80%] mr-2 sm:mr-8"
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
