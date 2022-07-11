import React, {useState, useEffect} from 'react'
import Camera from "../components/svg/Camera"
import Img from "../images/image1_goku.png"
// import Img from "../image1_goku.png"
// https://heroicons.com/
import { storage, db, auth } from '../backend/firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import Delete from "../components/svg/Delete"
// import { useHistory } from 'react-router-dom'; //R-Dom Version 5
import { useNavigate } from 'react-router-dom';

 const Profile = () => {
    
    const [img, setImg] = useState("");
    // console.log(img);
    const [user, setUser] = useState("");
    const history = useNavigate();
   
    useEffect(() => { 
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
                console.log("WALLAH UFUK IST NOOB" + user)
            }
        });

        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage, 
                    `avatar/${new Date().getTime()} - ${img.name}`
                    );
                    try {
                        if (user.avatarPath) {
                            await deleteObject(ref(storage, user.avatarPath));
                        }
                        const snap = await uploadBytes(imgRef, img);
                        const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

                        await updateDoc(doc(db, "users", auth.currentUser.uid), {
                            avatar: url,
                            avatarPath: snap.ref.fullPath,
                        });
                        console.log(snap.ref.fullPath)
                        console.log(url)
                        setImg("");
                    } catch (err) {
                        console.log(err.message);
                    }
            };
            uploadImg()
        }
    }, [img]);

    const deleteImage = async () => {
        try {
            const confirm = window.confirm("Delete avatar?");
            if(confirm) {
                await deleteObject(ref(storage, user.avatarPath));

                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    avatar: "",
                    avatarPath: "",
                });
                // history.replace("/"); react-router-dom Version 5
                history("/"); //react-router-dom Version 6
            }
        } catch (err) {
            console.log(err.message);
        }
    };

  return user ? (
   <section>
       <div className='profile_container'>
           <div className='img_container'>
               <img src={user.avatar || Img} alt='avatar' />
               <div className='overlay'>
                   <div>
                       <label htmlFor='photo'>
                           <Camera />
                       </label>
                       {user.avatar? <Delete deleteImage={deleteImage} /> : null}
                       <input type="file" 
                       accept="image/*" 
                       style={{ display: "none" }} 
                       id="photo" 
                       onChange={(e) => setImg(e.target.files[0])} />
                   </div>
               </div>
               </div>
               <div className='text_container'>
                   <h3>{user.surname}</h3>
                   <p>{user.email}</p>
                   <hr />
                   <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
           </div>
       </div>
   </section>
  ) : null
}

export default Profile;
