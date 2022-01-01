import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, setDoc } from '@firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/use-auth';
import { FaPaperPlane } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const dummySpace = useRef();
  const router = useRouter();
  const { receiverId } = router.query;

  const auth = useFirebaseAuth();
  const { authUser } = auth;

  const roomChat = authUser?.uid < receiverId ? `${authUser?.uid}_${receiverId}` : `${receiverId}_${authUser?.uid}`;

  useEffect(() => {
    const getMessages = async () => {
      const messagesRef = collection(db, 'chats', `${roomChat}`, 'messages');
      const q = query(messagesRef, orderBy('createdAt'), limit(50));

      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(data);
      });
    };

    getMessages();
  }, [db, roomChat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addMess = async () => {
      await setDoc(doc(db, 'chats', `${roomChat}`), {
        participants: [authUser.uid, receiverId],
      });

      await addDoc(collection(db, 'chats', `${roomChat}`, 'messages'), {
        text: newMessage,
        createdAt: Date.now(),
        participants: [authUser.uid, receiverId],
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
    <div className='w-96 h-full shadow-lg bg-slate-100 relative rounded-lg mt-4'>
      <div className='w-full h-full overflow-y-scroll'>
        <ul className='w-full flex flex-col'>
          {messages.length > 0
            ? messages.map((message) => {
                return (
                  <li
                    key={message.id}
                    className={'mb-4 ' + (message.uid === authUser?.uid ? 'max-w-xs self-end text-right ' : 'max-w-xs self-start text-left ')}
                  >
                    <section className={'flex  ' + (message.uid === authUser?.uid ? '' : 'flex-row-reverse')}>
                      {/* display message text */}
                      <p
                        className={
                          'mr-4 ' +
                          (message.uid === authUser?.uid ? 'bg-purple-600 p-2 rounded-lg text-white' : 'bg-white p-2 rounded-lg text-purple-900 ml-4')
                        }
                      >
                        {message.text}
                      </p>

                      {/* display user image */}
                      {message.photoURL ? <img src={message.photoURL} alt='' className='w-8 h-8 rounded-full' /> : null}
                    </section>
                  </li>
                );
              })
            : null}
        </ul>
        <section ref={dummySpace}></section>
      </div>
      <form onSubmit={handleSubmit} className='absolute top-full left-0 flex w-full bg-slate-100 p-2'>
        <input
          className='flex-grow h-12 p-2 rounded-full bg-white mr-2'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type your message here...'
        />

        <button
          type='submit'
          disabled={!newMessage}
          className='flex justify-center items-center bg-purple-600 w-12 h-12 text-white rounded-full hover:bg-purple-800 cursor-pointer'
        >
          <FaPaperPlane className='text-xl' />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
