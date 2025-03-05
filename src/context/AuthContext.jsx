import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Récupérer les informations supplémentaires depuis Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ ...currentUser, role: userDoc.data().role });
        } else {
          // Si aucun document n'existe, on garde uniquement les infos Firebase Auth
          setUser(currentUser);
          // Créer un document pour le nouvel utilisateur
          await setDoc(doc(db, "users", currentUser.uid), {
            email: currentUser.email,
            role: "coureur", // Rôle par défaut
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Ajouter l'utilisateur dans Firestore avec un rôle par défaut
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "coureur",
        createdAt: new Date().toISOString(),
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}