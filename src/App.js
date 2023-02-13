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
/*
  if (!isAuth) {
    return (
      <div className="App">
        <section className="mainSection">
          <Auth setIsAuth={setIsAuth} />
        </section>
      </div>
    );
  }*/
  return (
    <section className="mainSection flex justify-around items-center">
    <div  className="flex justify-between items-center w-[800px] h-[430px] border-b-4 powerShell text-2xl">
    {room ? (
        <Chat room={room} />
      ) : (
        <div className="room w-scren h-screen flex justify-center items-center">
          {" "}
          <label className="mx-4">Napiš jméno místnosti</label>
          <input className="border-4 mr-10" ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)} className="px-4 hover:opacity-0 ease-in-out duration-700 bg-red-700 animate-pulse">
            --Vstup--
          </button>
        </div>
      )}{" "}
    </div>
     
    </section>
  );
}

export default App;
