import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth.js";
import Cookies from "universal-cookie";
import Chat from "./components/Chat.js";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <section className="mainSection">
          <Auth setIsAuth={setIsAuth} />
        </section>
      </div>
    );
  }
  return (
    <section className="mainSection">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room w-scren h-screen flex justify-center items-center">
          {" "}
          <label>Napiš jméno místnosti</label>
          <input className="border-4" ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            --Vstup--
          </button>
        </div>
      )}{" "}
    </section>
  );
}

export default App;
