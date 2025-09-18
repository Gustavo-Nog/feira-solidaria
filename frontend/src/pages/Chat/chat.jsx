import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useUser } from '../../context/UserContext'; 
import mensagemService from '../../services/mensagemService';
import Button from '../../components/Button/Button';
import './chat.css';

const MessageItem = ({ msg, onUserClick }) => {
  return (
    <div className={`message ${msg.type}`}>
      <strong 
        className="sender-name"
        onClick={() => onUserClick(msg.senderId, msg.senderName)}
        style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
      >
        {msg.senderName || 'Anônimo'}
      </strong>: {msg.text}
      <small className="timestamp">
        {new Date(msg.timestamp).toLocaleString('pt-BR')}
      </small>
    </div>
  );
};

const Chat = ({ produtoId = null, produtoNome = 'Geral' }) => {
  const { usuario } = useUser(); // Pega usuário logado
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [privateChatWith, setPrivateChatWith] = useState(null); // null = 
  const [users, setUsers] = useState([]); 
  const messagesEndRef = useRef(null);

  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  const fetchMessages = useCallback(async () => {
    if (!usuario?.pessoaId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
    
      let allMessages = await mensagemService.listarMensagens();
      
      const uniqueUsers = new Map();
      allMessages.forEach((msg) => {
        if (msg.senderId !== usuario.pessoaId && msg.senderName) {
          uniqueUsers.set(msg.senderId, { id: msg.senderId, name: msg.senderName });
        }
      });
      setUsers(Array.from(uniqueUsers.values()));

      let messages;
      if (privateChatWith) {
        messages = allMessages.filter((msg) => 
          (msg.senderId === usuario.pessoaId && msg.destinatarioId === privateChatWith.id) ||
          (msg.senderId === privateChatWith.id && msg.destinatarioId === usuario.pessoaId)
        );
      } else if (produtoId) {
        messages = allMessages.filter((msg) => msg.produtoId === produtoId);
      } else {
        messages = allMessages;
      }

      const formattedMessages = messages.map((msg) => ({
        ...msg,
        senderName: msg.senderId === usuario.pessoaId ? usuario.nome : msg.senderName,
        type: msg.senderId === usuario.pessoaId ? 'sent' : 'received',
      })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // 

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    } finally {
      setIsLoading(false);
    }
  }, [usuario, produtoId, privateChatWith]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || !usuario?.pessoaId) return;

    setIsSending(true);
    const newMessage = {
      text: input,
      senderId: usuario.pessoaId,
      senderName: usuario.nome || 'Anônimo',
      timestamp: new Date().toISOString(),
    };

    if (privateChatWith) {
      newMessage.destinatarioId = privateChatWith.id;
    } else if (produtoId) {
      newMessage.produtoId = produtoId;
    }

    try {

      await mensagemService.criarMensagem(newMessage);
      setInput('');
      await fetchMessages(); 
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsSending(false);
    }
  }, [input, usuario, privateChatWith, produtoId, fetchMessages]); 
  const handleUserClick = (userId, userName) => {
    setPrivateChatWith({ id: userId, name: userName });
  };

  const closePrivateChat = () => {
    setPrivateChatWith(null);
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); 

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!isSending) {
      sendMessage();
    }
  };

  if (isLoading) {
    return <div className="chat-container"><p>Carregando mensagens...</p></div>;
  }

  return (
    <div className="chat-container">
      {/* Sidebar de usuários (apenas se não for privado ou para mostrar lista) */}
      {!privateChatWith && (
        <div className="users-sidebar">
          <h3>Usuários Online/Ativos</h3>
          {users.length === 0 ? (
            <p>Nenhum usuário ainda.</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id} onClick={() => handleUserClick(user.id, user.name)}>
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="chat-header">
        {privateChatWith ? (
          <>
            Chat privado com <strong>{privateChatWith.name}</strong>
            <Button onClick={closePrivateChat} style={{ marginLeft: '10px', fontSize: '12px' }}>← Voltar ao grupo</Button>

          </>
        ) : (
          <>Chat sobre <strong>{produtoNome}</strong></>
        )}
      </div>

      {/* Lista de mensagens */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="no-messages">
            {privateChatWith ? `Nenhuma mensagem privada com ${privateChatWith.name} ainda. Inicie a conversa!` : 'Nenhuma mensagem ainda. Inicie a conversa!'}
          </p>
        ) : (
          messages.map((msg, index) => (
            <MessageItem key={msg.id || index} msg={msg} onUserClick={handleUserClick} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input e botão */}
      <div className="chat-input-container">
        {/* Substituído InputField por input nativo para evitar erro do RHF */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSendMessage()}
          placeholder={
            privateChatWith ? 
              `Mensagem privada para ${privateChatWith.name}...` 
              : 'Digite sua mensagem...'
          }
          disabled={isSending || !usuario}
          maxLength={500}
          className="chat-input" // Adicione estilos no chat.css se precisar (ex: width: 70%; padding: 10px;)
        />

        <Button 
          onClick={handleSendMessage} 
          disabled={isSending || !usuario || !input.trim()}
        >
          {isSending ? 'Enviando...' : 'Enviar'}
        </Button>
        {!usuario && <p className="warning">Faça login para usar o chat.</p>}
      </div>
    </div>
  );
};

export default Chat;