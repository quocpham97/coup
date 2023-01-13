import React, { FormEvent, useEffect, useState, KeyboardEvent } from 'react';
import { Types } from 'ably';
import Link from 'next/link';
import { useChannel } from '@ably-labs/react-hooks';
import { CHANNEL_NAME } from 'constants/channel';
import styles from './chat.module.css';

function AblyChatComponent() {
  let inputBox: HTMLTextAreaElement | null = null;
  let messageEnd: HTMLDivElement | null = null;

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel(CHANNEL_NAME.room, (message) => {
    setMessages((prev) => [...prev.slice(-199), message]);
  });

  useEffect(() => {
    channel.presence.enter();
    return () => {
      channel.presence.leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendChatMessage = (msgText: string) => {
    channel.publish({ name: 'chat-message', data: msgText });
    setMessageText('');
    inputBox && inputBox.focus();
  };

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? 'me' : 'other';
    return (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index} className={styles.message} data-author={author}>
        {message.data}
      </span>
    );
  });

  useEffect(() => {
    messageEnd && messageEnd.scrollIntoView({ behaviour: 'smooth' } as ScrollIntoViewOptions);
  });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        />
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
      <Link href="/test">Leave chat</Link>
    </div>
  );
}

export default AblyChatComponent;
