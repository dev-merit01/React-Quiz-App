// AuthListener.js
// Listens for Firebase auth changes and updates Redux
// Ensures persistent login on refresh

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, reload } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { setUser } from "./store/authSlice";
import { doc, getDoc } from "firebase/firestore";

export default function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Reload to get latest emailVerified status
        await reload(user);

        // Load Firestore profile
        const snap = await getDoc(doc(db, "users", user.uid));

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...snap.data(),
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}
