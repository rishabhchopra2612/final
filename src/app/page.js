import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to GREEN AI. Ask any question from Class 12 Mathematics and Biology!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: `AI response to: ${input}` }]);
    }, 500);

    setInput('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>GREEN AI</h1>
      <p>Powered by Evergreen wisdom, driven by AI intelligence — welcome to the future of learning with GREEN AI.</p>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '10px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'GREEN AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          style={{ width: '80%', padding: '10px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button style={{ padding: '10px 20px', marginLeft: '10px' }} onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
