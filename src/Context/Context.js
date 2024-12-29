import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../Firebase/Firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';import { doc, setDoc } from 'firebase/firestore';

const PsiContext = createContext({
    login: () => Promise,
    register: () => Promise,
    logout: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise,
  })

  function PsiProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [theme, setTheme] = useState('dark');
    const [loading, setLoading] = useState(true);
    
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password)
    }
    
    const register = async (nombre,apellido,fechaNacimiento,domicilio,telefono,dni,email,password) => {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "pacientes", auth?.currentUser?.uid), {
        nombre,
        apellido,
        fechaNacimiento,
        domicilio,
        telefono,
        dni,
        email,
        password,
        role: 'user'
      });
      
    };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(email);
  };

  
  function logout() {
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    theme,
    toggleTheme,
    login,
    register,
    logout,
    resetPassword,
  };
  
  return (
    <PsiContext.Provider value={value}>
      {!loading && children}
    </PsiContext.Provider>
  )
}

export { PsiProvider, PsiContext };

export const useAuth = () => {
  return useContext(PsiContext);
};