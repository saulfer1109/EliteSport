import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainer = useRef(null);

  // Efecto para scroll automático y mensaje inicial
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
    
    if (messages.length === 0 && isOpen) {
      setMessages([{ 
        sender: 'bot', 
        text: '¡Hola! Bienvenido a EliteSport. ¿En qué puedo ayudarte hoy?', 
        options: ['Ver productos', 'Consultar stock', 'Hablar con representante'] 
      }]);
    }
  }, [messages, isOpen]);

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/webhook', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: data.reply || data.message || 'No entendí tu solicitud', 
          options: data.options || [] 
        }
      ]);

    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: 'Lo siento, hubo un error al procesar tu solicitud. Por favor intenta nuevamente.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    sendMessage(option);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {!isOpen ? (
        <button onClick={toggleChat} style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          💬 Chatbot
        </button>
      ) : (
        <div style={{
          width: '350px',
          height: '500px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            padding: '15px', 
            borderBottom: '1px solid #eee', 
            textAlign: 'center',
            backgroundColor: '#007bff',
            color: 'white',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }}>
            <strong>Chatbot EliteSport</strong>
            <button 
              onClick={toggleChat}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div 
            ref={chatContainer}
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '15px',
              backgroundColor: '#f9f9f9'
            }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                marginBottom: '15px', 
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{
                  display: 'inline-block',
                  maxWidth: '80%',
                  padding: '10px 15px',
                  backgroundColor: msg.sender === 'user' ? '#007bff' : '#fff',
                  color: msg.sender === 'user' ? 'white' : '#333',
                  borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  wordWrap: 'break-word'
                }}>
                  {msg.text}
                </div>

                {msg.options && msg.options.length > 0 && (
                  <div style={{ 
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}>
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        style={{
                          margin: '5px 0',
                          padding: '8px 15px',
                          background: '#f0f0f0',
                          color: '#333',
                          border: 'none',
                          borderRadius: '18px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          ':hover': {
                            background: '#007bff',
                            color: 'white'
                          }
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ textAlign: 'left', margin: '10px 0' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  backgroundColor: '#fff',
                  borderRadius: '18px 18px 18px 0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ccc',
                      animation: 'bounce 1.4s infinite ease-in-out'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ccc',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0.2s'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ccc',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ 
            borderTop: '1px solid #eee', 
            padding: '15px',
            backgroundColor: '#fff'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                style={{ 
                  flex: 1, 
                  padding: '12px 15px', 
                  border: '1px solid #ddd',
                  borderRadius: '24px',
                  outline: 'none',
                  fontSize: '14px'
                }}
                disabled={isLoading}
              />
              <button
                onClick={() => !isLoading && sendMessage()}
                disabled={isLoading}
                style={{ 
                  padding: '12px 15px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    background: '#0056b3'
                  },
                  ':disabled': {
                    background: '#ccc',
                    cursor: 'not-allowed'
                  }
                }}
              >
                {isLoading ? '...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;