import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../backend/firebase";
import { collection, query, where, onSnapshot, addDoc,
         Timestamp, orderBy, setDoc, doc, getDoc, updateDoc, getFirestore, getDocs} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Message from "../components/Message";

 const Home = () => {

  const [users, setUsers] = useState([]);
  const [chat, setChat]   = useState("");
  const [text, setText]   = useState("");
  const [img, setImg]     = useState(""); 
  const [msgs, setMsgs]   = useState([]); 
  const [tips, setTips]   = useState([]);

  //const user1 = auth.currentUser.uid

  const auth = getAuth();
  const db = getFirestore();

  const userCurrentauth = auth.currentUser;
  const user1 = userCurrentauth.uid;


  useEffect (() => {
    //const usersRef = collection(db, "users");
    //create query object
    const q = query(collection(db, "users"), 
    where("id", "!=", user1));
    //execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      const users1 = [];
      querySnapshot.forEach((doc) => {
        users1.push(doc.data());
        console.log("blyat")
      });
      setUsers(users1);
      console.log("hallo query users " + users1);
    });
    return () => unsub();
  }, []);
  //console.log("hallo query users " + users);

  const selectUser = async (user) => {
    setChat(user);
     console.log(user);

     const user2 = user.id
     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

     const msgsRef = collection(db, "messages", id, "chat")
     const q = query(msgsRef, orderBy("createdAt", "asc"))

     onSnapshot(q, querySnapshot => {
       let msgs = []
       querySnapshot.forEach(doc => {
         msgs.push(doc.data())
       })
       setMsgs(msgs);
     });

     // get last message b/w logged in user and selected user
     const docSnap = await getDoc(doc(db, "lastMsg", id))
     // if last message exists and message is from selected user
     if(docSnap.data() && docSnap.data().from !== user1) {
     // update last message doc, set unread to false
       await updateDoc(doc(db, "lastMsg", id), {unread: false});
     } 
  };
  console.log(msgs);

  const handleSubmit = async e => {
    e.preventDefault()

    const user2 = chat.id

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    let url;
    if(img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl;
    }

    // messages => id => chat => add doc
    await addDoc(collection(db, "messages", id, "chat"), {
      text, 
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });
    setText("");
  };

  return <div className="home_container">
    <div className="users_container">
      {users.map((user) => (
         <User 
          key ={user.id} 
          user={user} 
          selectUser={selectUser} 
          user1={user1} 
          chat= {chat} />
         ))}
    </div>
    <div className="messages_container">
      {chat ? (
        <>
         <div className="messages_user">
        <h3>{chat.name}</h3>
        </div>
        <div className="messages">
          {msgs.length 
          ? msgs.map((msg, i) => (
             <Message key={i} msg={msg} user1={user1} />
             ))
          : null}
        </div>
        <MessageForm 
        handleSubmit={handleSubmit} 
        text={text} 
        setText={setText}
        setImg={setImg}
        />
        </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
    </div>
  </div>;
};

export default Home;