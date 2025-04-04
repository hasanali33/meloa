import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Calendar from 'react-calendar'; // Calendar component
import 'react-calendar/dist/Calendar.css';

export default function BookingForm({ therapistId, therapistName }) {
  const [formData, setFormData] = useState({
    sessionTime: '', // Add sessionTime here
    sessionDate: null,
    clientName: '',
    clientEmail: '',
  });

  const [selectedTab, setSelectedTab] = useState('intro'); // 'intro' or 'session'
  const [selectedTime, setSelectedTime] = useState(''); // Track selected time separately
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null); // For logged-in user
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data.user)
      setUser(data?.user);
      if (data?.user) {
        const { data: client, error: clientError } = await supabase
            .from('clients')
            .select('name')
            .eq('email', data.user?.email)  // Using email to get client data
            .single();

            if (clientError) {
                console.error('Error fetching client:', clientError.message);
            } else {
            setFormData((prevState) => ({
                ...prevState,
                clientName: client.name || '', // Set client name if available
                clientEmail: data.user?.email || ''
            }));
            }
      }
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Update the selected time
    setFormData((prev) => ({ ...prev, sessionTime: time })); // Also update the formData
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedTime(''); // Reset time selection on tab change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    if (!formData.sessionTime) {
      alert('Please select a session time.');
      setLoading(false);
      return;
    }

    // Get the selected date from the calendar
    const selectedDate = new Date(formData.sessionDate);
    
    // If the date is invalid, show an error
    if (isNaN(selectedDate)) {
      alert('Invalid date selected.');
      setLoading(false);
      return;
    }

    // Extract the hour and minute from sessionTime (time in '12:00 PM' format)
    const [hour, minute] = formData.sessionTime.split(':');
    const [timeOfDay] = formData.sessionTime.split(' ').slice(1); // 'AM' or 'PM'

    let hour24Format = parseInt(hour); // Start with the 12-hour format hour
    const minuteVal = parseInt(minute); // Convert minute string to number

    // Convert to 24-hour time format if necessary
    if (timeOfDay === 'PM' && hour24Format !== 12) hour24Format += 12; // Convert PM to 24-hour format

    // Set the time for the selected date
    const formattedTime = new Date(selectedDate.setHours(hour24Format, minuteVal));

    // Check if the new date-time is valid
    if (isNaN(formattedTime.getTime())) {
      alert('Invalid time selected.');
      setLoading(false);
      return;
    }

    const sessionTime = formattedTime.toISOString(); // Convert to ISO string for database submission

    // Proceed with the API call to insert the booking request
    const { error } = await supabase.from('booking_requests').insert({
      therapist_id: therapistId,
      client_name: formData.clientName,
      client_email: formData.clientEmail,
      message: `Booking a session with therapist ${therapistId}`, // Hardcoded message for now
      session_time: sessionTime, // Insert the formatted session time
    });

    if (!error) {
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
    } else {
      console.error('Booking error:', error.message);
    }

    setLoading(false);
  };

  const handleLoginRedirect = () => {
    // Redirect to login page or show login modal
    window.location.href = '/login'; // You can replace this with your actual login URL
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
      {/* Tabs for selecting session type */}
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

      {/* Calendar Date Picker */}
      <div className="space-y-1">
        <label className="text-xs text-gray-700 font-medium">Select a Date</label>
        <Calendar
          onChange={(date) => setFormData({ ...formData, sessionDate: date })}
          value={formData.sessionDate}
        />
      </div>

      {/* Time Slots */}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-2 rounded-lg hover:opacity-90 transition text-sm shadow"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {/* Modal for Login Prompt */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p>Please log in to complete your booking.</p>
            <button
              onClick={handleLoginRedirect}
              className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg"
            >
              Log In or Sign Up
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 bg-gray-300 text-black px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

