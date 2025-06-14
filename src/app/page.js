'use client';
import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to GREEN AI. Ask any question related to educational topics!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <img src="/logo.png" alt="Logo" style={{ height: 60, marginBottom: 20 }} />
      <h1 style={{ color: '#2E8B57' }}>GREEN AI</h1>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: 10,
        padding: 10,
        height: 400,
        overflowY: 'scroll',
        background: '#f6fdf8'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '10px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'GREEN AI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div><i>Thinking...</i></div>}
      </div>
      <div style={{ marginTop: 10, display: 'flex' }}>
        <input
          style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #ccc' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button style={{ marginLeft: 10, padding: '10px 20px', borderRadius: 10, background: '#2E8B57', color: 'white' }} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
