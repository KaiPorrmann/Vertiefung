import React, {useEffect, createContext, useContext, useState } from "react";
//import AuthService from "./AuthService";
import { getFirestore, collection, getDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

/*export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const loginWithEmail = async () => {
     const { error, user } = await AuthService.loginWithEmail();
    setUser(user ?? null);
    setError(error ?? ""); 
  };

  const logout = async () => {
    //await AuthService.logout();
    setUser(null);
  };
  const value = { user, error, loginWithEmail, logout, setUser };

  return <AuthContext.Provider value={value} {...props} />;
}
*/

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const auth = getAuth();
  const db = getFirestore();

  function signup (email, password) 
  {
    createUserWithEmailAndPassword(auth, email , password)
    .then((userCredential)=>{
        // send verification mail.
     userCredential.user.sendEmailVerification();
      
      alert("Email sent");
    })
    .catch(alert);
  }

  function sendEmailVerification(email) {
    return sendEmailVerification(auth.currentUser, email)
  }

  function login(email, password) {
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
     return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return updateEmail(auth.currentUser, email)
  }

  function updatePassword(password) {
    return updatePassword(auth.currentUser, password)
  }
  
  const user = auth.currentUser;
  const userID = user.uid;
  
  const [user4, setUser] = useState()

  async function getUser  (doc) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
  };

  function getAdmin(){
    const userd = auth.currentUser;
    const userID = userd.uid;
    getUser(userID);
    return user4.companyid
  }

  /* function setPersistence (remember){
     const elect = ""
      {remember ? elect= "LOCAL" : elect= "SESSION"}     
    
    return auth.setPersistence(`auth.Auth.Persistence.${elect}`)
     auth.setPersistence() 
  } */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    sendEmailVerification,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 
