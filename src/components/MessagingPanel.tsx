// components/MessagingPanel.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function MessagingPanel({ booking, userRole }) {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const isTherapist = userRole === 'therapist';

  useEffect(() => {
    if (!booking) return;

    const fetchAll = async () => {
      setLoading(true);

      const [{ data: msgs, error: msgErr }, { data: sess, error: sessErr }] = await Promise.all([
        supabase
          .from('messages')
          .select('*')
          .eq('booking_id', booking.id)
          .order('created_at', { ascending: true }),
        supabase
          .from('sessions')
          .select('*')
          .eq('booking_request_id', booking.id)
          .single(),
      ]);

      if (msgErr) console.error('Fetch messages error:', msgErr.message);
      else setMessages(msgs);

      if (sessErr) console.error('Session fetch error:', sessErr.message);
      else setSession(sess);

      setLoading(false);
    };

    fetchAll();

    const channel = supabase
      .channel(`messages-booking-${booking.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `booking_id=eq.${booking.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [booking]);

  const sendMessage = async () => {
    if (!reply.trim()) return;

    const newMessage = {
      booking_id: booking.id,
      sender: isTherapist ? 'therapist' : 'client',
      content: reply,
    };

    const { error } = await supabase.from('messages').insert(newMessage);

    if (!error) {
      setReply('');
      setMessages((prev) => [...prev, { ...newMessage, created_at: new Date().toISOString() }]);
    } else {
      console.error('Send message error:', error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const isJoinable =
    session && new Date(session.session_time).getTime() - Date.now() < 15 * 60 * 1000;

  if (!booking) {
    return <div className="p-4 text-gray-500 italic">Select a session to chat.</div>;
  }

  if (loading) {
    return (
      <div className="p-4 text-gray-500 flex items-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading messages...
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded-lg p-4 bg-white shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-purple-700">
        Chat about your session with {isTherapist ? booking.client_name : 'your guide'}
      </h3>

      {session && (
        <div className="text-sm text-gray-600 border rounded-lg p-3 bg-gray-50">
          <p>
            📆 Scheduled for:{' '}
            <strong>{new Date(session.session_time).toLocaleString()}</strong>
          </p>
          {isJoinable && (
            <a
              href={session.daily_room_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Join Video Call
            </a>
          )}
        </div>
      )}

      <div className="max-h-64 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded w-fit max-w-[80%] ${
              msg.sender === (isTherapist ? 'therapist' : 'client')
                ? 'ml-auto bg-purple-100 text-right'
                : 'bg-gray-100 text-left'
            }`}
          >
            <p className="text-gray-800">{msg.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(msg.created_at).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={handleKeyDown}
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
