"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function TherapistProfileEditor({ user }) {
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchTherapist() {
      const { data, error } = await supabase
        .from("therapists")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) console.error(error);
      else setTherapist(data);
      setLoading(false);
    }

    if (user) fetchTherapist();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTherapist((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase
      .from("therapists")
      .update({
        full_name: therapist.full_name,
        bio: therapist.bio,
        calendly_link: therapist.calendly_link,
      })
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      setMessage("Error updating profile.");
    } else {
      setMessage("Profile updated successfully ✅");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="full_name"
          value={therapist.full_name || ""}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="bio"
          value={therapist.bio || ""}
          onChange={handleChange}
          placeholder="Your Bio"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="calendly_link"
          value={therapist.calendly_link || ""}
          onChange={handleChange}
          placeholder="Calendly Link"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>

        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}
