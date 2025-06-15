'use client';
import React, { useState } from 'react';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'system', content: `Welcome to GREEN AI 🌿 — your personal AI-powered tutor, trained to simplify Learning.
      Ask me anything — concepts, formulas, definitions, or exam questions — and I\'ll explain it clearly, step-by-step, just like your best teacher would! 📚✨` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSend = async () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...newMessages] }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: 'API error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #e8f5e9, #ffffff)',
      minHeight: '100vh',
      padding: 20,
      fontFamily: 'Arial'
    }}>
      <div style={{ maxWidth: 800, margin: 'auto' }}>
        <img src="/logo.png" alt="Logo" style={{ height: 160, marginBottom: 20 }} />
        <h1 style={{ color: '#2E8B57', marginBottom: 10 }}>GREEN AI</h1>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: 20 }}>
          Powered by Evergreen wisdom, driven by AI intelligence — welcome to the future of learning with GREEN AI.
        </p>

        <div style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: 15,
          padding: 20,
          backgroundColor: '#ffffff',
          height: 600,
          overflowY: 'scroll'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              backgroundColor: msg.role === 'user' ? '#c8e6c9' : '#f0f0f0',
              padding: '10px 15px',
              borderRadius: '10px',
              maxWidth: '80%',
              margin: msg.role === 'user' ? '10px 0 10px auto' : '10px auto 10px 0'
            }}>
              <strong>{msg.role === 'user' ? 'You' : 'GREEN AI'}:</strong>
              <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
            </div>
          ))}
          {loading && <div><i>Thinking...</i></div>}
            <div ref={messagesEndRef} />
        </div>

        <div style={{ marginTop: 10, display: 'flex' }}>
          <input
            style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #ccc' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            style={{ marginLeft: 10, padding: '10px 20px', borderRadius: 10, background: '#2E8B57', color: 'white' }}
            onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
