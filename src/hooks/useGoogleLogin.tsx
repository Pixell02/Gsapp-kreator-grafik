import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import useSetReflinkUser from "./useSetReflinkUser";

const useGoogleLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const { handleSetReflink } = useSetReflinkUser();
  const signInWithGoogle = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        handleSetReflink(res.user.uid);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { signInWithGoogle, error };
};

export default useGoogleLogin;
