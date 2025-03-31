'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function MessagingPanel({ booking }) {
  if (!booking) {
    return (
      <div className="p-4 text-gray-600 italic">
        Select a request to view and reply.
      </div>
    );
  }  
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('booking_id', booking.id)
        .order('created_at', { ascending: true });

      if (error) console.error('Fetch messages error:', error.message);
      else setMessages(data);

      setLoading(false);
    };

    fetchMessages();
  }, [booking.id]);

  const sendMessage = async () => {
    if (!reply.trim()) return;

    const { error } = await supabase.from('messages').insert({
      booking_id: booking.id,
      sender: 'therapist',
      content: reply,
    });

    if (!error) {
      setReply('');
      setMessages((prev) => [...prev, {
        booking_id: booking.id,
        sender: 'therapist',
        content: reply,
        created_at: new Date().toISOString()
      }]);
    } else {
      console.error('Send message error:', error.message);
    }
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <div className="mt-4 border rounded-lg p-4 bg-white shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-purple-700">Messages</h3>
      <div className="max-h-64 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.sender === 'therapist' ? 'bg-purple-100 text-right' : 'bg-gray-100 text-left'}`}>
            <p><strong>{msg.sender === 'therapist' ? 'You' : booking.client_name}</strong>: {msg.content}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
