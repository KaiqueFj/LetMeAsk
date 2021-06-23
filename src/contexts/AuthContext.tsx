import { useState } from "react";
import { createContext, ReactNode, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const [user, setUser] = useState<User>();

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error("missing informations from google account");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  });

  return () => {
    unsubscribe();
  };
}, []);

async function singInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await auth.signInWithPopup(provider);

  if (result.user) {
    const { displayName, photoURL, uid } = result.user;

    if (!displayName || !photoURL) {
      throw new Error("missing informations from google account");
    }
    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
    });
  }
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
