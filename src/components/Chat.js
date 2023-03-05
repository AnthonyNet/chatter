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

const styles = {
  section: "chat-app w-[100vw] h-screen flex items-center justify-center sm:p-8  mainSection",
  section__div: "h-full w-full flex flex-col justify-between items-center sm:border-4 m-auto",
  section__div__header: "w-full flex justify-between items-center",
  section__div__header__h2: "text-3xl",
  section__div__article: "h-[85vh] w-full overflow-auto flex flex-col p-2 text-xl border-4 border-white bg-black",
  section__div__form: "w-full flex justify-center items-center",
  section__div__form__input: "w-[60%] sm:w-[80%] mr-2 sm:mr-8",
  section__div__form__button: "anime border-2",

  
}

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [userX, setUserX] = useState(null);


useEffect(() => {
  setUserX(prompt("Zadej jméno:"));
  }, []);

  const checkName = () => {
    if (userX === "" || userX === " ") {
      setUserX("Anonym");
    }
  };
  checkName()
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
     // console.log(snapshot)
      let messages = [];
      snapshot.forEach((doc) => {
       
        messages.push({ ...doc.data(), id: doc.id });
      });
     // console.log(messages);
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
    <section className={styles.section}>
      <div className={styles.section__div}>
        <header className={styles.section__div__header}>
          <h2 className={styles.section__div__header__h2}>Vítej v: {room.toUpperCase()}</h2>
          <h2>Tvoje jméno: {userX}</h2>
        </header>
        <article className={styles.section__div__article}>
          {messages
            .slice(0)
            .reverse()
            .map((message) => (
              
              <div key={message.id} className="message">
                <span className="user">{message.user}:</span> {message.text}
                <span>{message.dateX}</span>
              </div>
            ))}
        </article>

 
        <form
          onSubmit={handleSubmit}
          className={styles.section__div__form}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className={styles.section__div__form__input}
            placeholder="Napiš zprávu..."
          />
          <button type="submit" className={styles.section__div__form__button}>
            Send
          </button>
        </form>
      </div>
    </section>
  ); 
};
 
export default Chat;
