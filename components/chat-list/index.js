import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useChatList from '../../hooks/use-chat-list';

const ChatList = () => {
  const router = useRouter();
  const { chatList } = useChatList();

  return (
    <ul>
      {chatList.map((user) => {
        return (
          <li
            key={user.uid}
            className='flex cursor-pointer'
            onClick={() => {
              router.push(`/chat/${user.uid}`);
            }}
          >
            {user.photoURL ? <img src={user.photoURL} alt='Avatar' className='w-8 h-8 rounded-full mr-4' /> : null}

            <p className=''>{user.displayName}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
