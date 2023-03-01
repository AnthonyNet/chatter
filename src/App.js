import { useState, useRef } from "react";
import "./App.css";

import Chat from "./components/Chat.js";

function App() {
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  return (
    <section className="mainSection flex justify-around items-center">
      <div className="flex justify-between items-center h-screen w-screen sm:w-[800px] sm:h-[430px]  powerShell text-2xl">
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room w-screen h-screen sm:h-screen flex flex-col sm:flex-row justify-center  items-center gap-4">
            {" "}
            <div>
              <input type="radio" id="html" name="fav_language" value="HTML" /> {" "}
              <label for="html">HTML</label>
              <br />
                <input type="radio" id="css" name="fav_language" value="CSS" /> {" "}
              <label for="css">CSS</label>
              <br />
               {" "}
              <input
                type="radio"
                id="javascript"
                name="fav_language"
                value="JavaScript" 
              />
                <label for="javascript">JavaScript</label>
            </div>
            <button
              onClick={() => setRoom(roomInputRef.current.value)}
              className="px-4 hover:opacity-0 ease-in-out duration-700 bg-red-700 animate-pulse"
            >
              --Vstup--
            </button>
          </div>
        )}{" "}
      </div>
    </section>
  );
}

export default App;
