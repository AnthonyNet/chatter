import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="w-screen h-screen auth flex justify-center items-center">
      <div className="flex justify-around items-center w-[800px] h-[430px] border-b-4 powerShell text-2xl">
      <p>C:\  </p>
      <p className="ml-4">λ <span className="anime">|</span></p>
      <p className="text-red">Přihlaš se Googlem:</p>
      <button onClick={signInWithGoogle} className=" px-4 mr-36 hover:opacity-0 ease-in-out duration-700 bg-red-700 animate-pulse">Přihlásit</button>
      </div>
    </section>
  );
};
