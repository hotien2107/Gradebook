import { addDoc, collection, limit, onSnapshot, orderBy, query } from '@firebase/firestore';
import { formatRelative } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/use-auth';

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const dummySpace = useRef();

  const auth = useFirebaseAuth();
  const { authUser } = auth;

  useEffect(() => {
    const getMessages = async () => {
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('createdAt'), limit(50));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(data);
        setMessages(data);
      });
    };

    getMessages();
  }, [db]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addMess = async () => {
      const docRef = await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: Date.now(),
        uid: authUser.uid,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
      });

      setNewMessage('');

      // scroll down the chat
      dummySpace.current.scrollIntoView({ behavor: 'smooth' });
    };

    addMess();
  };

  return (
    <div className='w-96 h-4/6 shadow-lg bg-slate-100 relative'>
      <ul>
        {messages.length > 0
          ? messages.map((message) => (
              <li key={message.id} className={message.uid === authUser.uid ? 'sent' : 'received'}>
                <section>
                  {/* display user image */}
                  {message.photoURL ? <img src={message.photoURL} alt='Avatar' width={45} height={45} /> : null}
                </section>

                <section>
                  {/* display message text */}
                  <p>{message.text}</p>

                  {/* display user name */}
                  {message.displayName ? <span>{message.displayName}</span> : null}
                  <br />
                  {/* display message date and time */}
                  {message.createdAt?.seconds ? <span>{formatRelative(new Date(message.createdAt.seconds * 1000), new Date())}</span> : null}
                </section>
              </li>
            ))
          : null}
      </ul>
      <section ref={dummySpace}></section>
      <form onSubmit={handleSubmit} className='absolute bottom-0 left-0'>
        <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Type your message here...' />

        <button type='submit' disabled={!newMessage}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
