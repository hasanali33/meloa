"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Loader2, User, Info, LinkIcon } from "lucide-react";

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
      setMessage("❌ Error updating profile.");
    } else {
      setMessage("✅ Profile updated successfully!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🧑‍🎨 Edit Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700 flex items-center gap-1">
            <User className="w-4 h-4" /> Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={therapist.full_name || ""}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700 flex items-center gap-1">
            <Info className="w-4 h-4" /> Short Bio
          </label>
          <textarea
            name="bio"
            value={therapist.bio || ""}
            onChange={handleChange}
            placeholder="Tell us a bit about your background..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Calendly Link */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700 flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> Calendly Link
          </label>
          <input
            type="text"
            name="calendly_link"
            value={therapist.calendly_link || ""}
            onChange={handleChange}
            placeholder="https://calendly.com/your-link"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          💾 Save Changes
        </button>

        {/* Feedback Message */}
        {message && (
          <p className="text-center text-sm font-medium mt-2 text-blue-600">{message}</p>
        )}
      </form>
    </div>
  );
}
