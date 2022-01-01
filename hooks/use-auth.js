import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { addDoc, collection, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';

const GoogleProvider = new GoogleAuthProvider();

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        setUsers((listUsers) => {
          listUsers.push(doc.data());
          return listUsers;
        });
      });
    };
    getAllUsers();
  }, []);

  const authStateChanged = (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const userRef = collection(db, 'users');
    const q = query(userRef, where("uid", "==", authState.uid));

    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAuthUser(data[0]);
    });

    setLoading(false);
  };

  const loginGoogle = async (loginSuccess) => {
    try {
      const loginRes = await signInWithPopup(auth, GoogleProvider);

      if (!loginRes.user) {
        return;
      }

      if (users.findIndex((userId) => userId.uid === loginRes.user.uid) < 0) {
        await addDoc(collection(db, 'users'), {
          uid: loginRes.user.uid,
          displayName: loginRes.user.displayName,
          photoURL: loginRes.user.photoURL,
          role: 1,
        });
      }

      loginSuccess();
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      router.push('/login');
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    loginGoogle,
    logout,
  };
}
