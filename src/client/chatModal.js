import React, { useEffect } from 'react';
import './App.css';

const ChatModal = () => {
  useEffect(() => {
    const onMessengerLoaded = () => {
      const dfMessenger = document.querySelector('df-messenger');
      
      if (!dfMessenger) {
        console.error('df-messenger element not found.');
        return;
      }

      const tryLoadIframe = () => {
        const iframe = dfMessenger.shadowRoot.querySelector('iframe');
        
        if (iframe) {
          iframe.onload = () => {
            setTimeout(() => {
              const iframeDocument = iframe.contentWindow.document;
              const userInput = iframeDocument.querySelector('input');
              if (userInput) {
                // Simulamos la entrada del usuario escribiendo "Hola"
                userInput.value = 'Hola';
                const inputEvent = new Event('input', { bubbles: true });
                userInput.dispatchEvent(inputEvent);
                
                // Simulamos que el usuario presiona "Enter"
                const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
                userInput.dispatchEvent(enterEvent);
              }
            }, 1000); // Ajustar el tiempo según sea necesario
          };
        } else {
          setTimeout(tryLoadIframe, 500);
        }
      };

      tryLoadIframe();
    };

    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger) {
      dfMessenger.addEventListener('df-messenger-loaded', onMessengerLoaded);
    } else {
      console.error('df-messenger element not found when adding listener.');
    }

    return () => {
      if (dfMessenger) {
        dfMessenger.removeEventListener('df-messenger-loaded', onMessengerLoaded);
      }
    };
  }, []);

  return (
    <div>
      <df-messenger
        chat-title="Chatbot"
        agent-id="599bec60-8666-4adf-9b15-2d557f391679"
        language-code="es"
      ></df-messenger>
    </div>
  );
};

export default ChatModal;
