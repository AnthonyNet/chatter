import { useState, useRef, useEffect } from "react";
import "./App.css";

import Chat from "./components/Chat.js";

function App() {
  const [room, setRoom] = useState(null);
  const [selectRoom, setSelectRoom] = useState(null);

// use it for Input room change
  const roomInputRef = useRef(null);



  return (
    <section className="mainSection flex justify-around items-center">
      <div className="flex justify-between items-center h-[50vh] w-screen sm:w-[800px] sm:h-[430px] powerShell text-2xl">
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room w-screen h-screen sm:h-screen flex flex-col justify-center  items-center gap-4">
           
            <h2>Choose room</h2>
            <div>
              <input
                type="radio"
                id="1"
                name="fav_language"
                value="Casual"
                onClick={()=>{setSelectRoom("Casual")}}
              />
               <label htmlFor="casual"> Casual Chat</label>
              <br />
             
              <input
                type="radio"
                id="2"
                name="fav_language"
                value="Javascript"
                onClick={()=>setSelectRoom("JavaScript")}
             //   onClick={()=>{setRoom("JavaScript")}}
              />
               <label htmlFor="javascript"> JavaScript</label>
              <br />
              <input
                type="radio"
                id="3"
                name="fav_language"
                value="React"
                onClick={()=>setSelectRoom("React")}
               // onClick={()=>{setRoom("React")}}
              />
              <label htmlFor="react"> React</label>
            </div>
            <button
             // onClick={() => setRoom(roomInputRef.current.value)}
             onClick={() => setRoom(selectRoom)}
              className="px-4 hover:opacity-0 ease-in-out duration-700 bg-red-700 animate-pulse"
            >
              -- Enter --
            </button>
          </div>
        )}{" "}
      </div>
    </section>
  );
}

export default App;
