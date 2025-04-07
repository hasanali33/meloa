import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function BookingForm({ therapistId, therapistName }) {
  const [formData, setFormData] = useState({
    sessionTime: '',
    sessionDate: null,
    clientName: '',
    clientEmail: '',
  });

  const [selectedTab, setSelectedTab] = useState('intro');
  const [selectedTime, setSelectedTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const authUser = data?.user;

      if (authUser) {
        const { data: client, error: clientError } = await supabase
          .from('clients')
          .select('id, name')
          .eq('email', authUser.email)
          .single();

        if (clientError) {
          console.error('Error fetching client:', clientError.message);
        } else {
          setUser({
            id: client.id, // uuid from clients table
            email: authUser.email,
          });

          setFormData((prevState) => ({
            ...prevState,
            clientName: client.name || '',
            clientEmail: authUser.email || '',
          }));
        }
      }
    };
    getUser();
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, sessionTime: time }));
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.sessionTime || !formData.sessionDate) {
      alert('Please select a date and time.');
      setLoading(false);
      return;
    }

    const selectedDate = new Date(formData.sessionDate);
    if (isNaN(selectedDate)) {
      alert('Invalid date selected.');
      setLoading(false);
      return;
    }

    const [timePart, period] = formData.sessionTime.split(' ');
    const [hourStr, minuteStr] = timePart.split(':');
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    if (period === 'PM' && hour !== 12) hour += 12;

    const formattedDate = new Date(selectedDate.setHours(hour, minute));
    const sessionTime = formattedDate.toISOString();

    // 1. Create booking request
    const { data: booking, error: bookingError } = await supabase
        .from('booking_requests')
        .insert({
            therapist_id: therapistId,
            client_id: user.id, // ✅ insert the client's UUID
            client_name: formData.clientName,
            client_email: formData.clientEmail,
            message: `Booking a session with therapist ${therapistId}`,
            session_time: sessionTime,
        })
        .select()
        .single();


    if (bookingError || !booking?.id) {
      console.error('Booking error:', bookingError?.message);
      setLoading(false);
      return;
    }

    // 2. Create session
    const sessionRes = await fetch('/api/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: user.id, // UUID from `clients` table
        therapistId,
        sessionTime,
        bookingRequestId: booking.id, // int8 from `booking_requests`
      }),
    });

    const sessionData = await sessionRes.json();

    if (!sessionRes.ok) {
      console.error('Session creation error:', sessionData.error);
      setLoading(false);
      return;
    }

    // 3. Send email
    const { data: therapist, error: fetchError } = await supabase
      .from('therapists')
      .select('email, full_name')
      .eq('id', therapistId)
      .single();

    if (!fetchError && therapist?.email) {
      await fetch('/api/sendBookingEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          therapistEmail: therapist.email,
          therapistName: therapist.full_name,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
        }),
      });
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-xl shadow-md border bg-white text-center space-y-4">
        <p className="text-green-600 text-sm font-medium">
          ✅ Your session has been booked! You'll receive a confirmation email shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="w-full bg-green-500 text-white py-2 rounded-full font-medium text-sm hover:bg-green-600 transition"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl p-4 shadow-md border space-y-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleTabChange('intro')}
          className={`w-full py-2 rounded-lg ${selectedTab === 'intro' ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'}`}
        >
          Book a Free Intro Call
        </button>
        <button
          onClick={() => handleTabChange('session')}
          className={`w-full py-2 rounded-lg ${selectedTab === 'session' ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'}`}
        >
          Book a Session
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-700 font-medium">Select a Date</label>
        <Calendar
          onChange={(date) => setFormData({ ...formData, sessionDate: date })}
          value={formData.sessionDate}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-700 font-medium">Select a Time</label>
        <div className="flex gap-2">
          {['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'].map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`w-full py-2 text-sm rounded-lg border ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-white border-gray-200 text-gray-800'} hover:bg-gray-100`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-2 rounded-lg hover:opacity-90 transition text-sm shadow"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
}
