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
    <section className="w-screen h-screen auth flex justify-center items-center bg-slate-50">
      <div className="flex justify-around min-w-[400px] border-b-4">
      <p className="text-red ">Přihlaš se Googlem:</p>
      <button onClick={signInWithGoogle} className="bg-red-400 px-4">Přihlásit</button>
      </div>
    </section>
  );
};
