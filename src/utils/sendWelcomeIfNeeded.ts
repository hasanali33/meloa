import { supabase } from '../../lib/supabaseClient'; // adjust path if needed

export const sendWelcomeIfNeeded = async (user) => {
  const email = user.email;
  if (!email) return;

  // Try finding in healers first
  let { data, error } = await supabase
    .from('healers')
    .select('welcomeEmailSent')
    .eq('email', email)
    .single();

  if (!error && data) {
    if (data.welcomeEmailSent) return;

    // Send welcome to healer
    await fetch('/api/sendWelcomeEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: user.user_metadata?.name, role: 'healer' }),
    });

    await supabase.from('healers').update({ welcomeEmailSent: true }).eq('email', email);
    return;
  }

  // If not in healers, check clients
  const { data: clientData, error: clientError } = await supabase
    .from('clients')
    .select('welcomeEmailSent')
    .eq('email', email)
    .single();

  if (!clientError && clientData && !clientData.welcomeEmailSent) {
    // Send welcome to client
    await fetch('/api/sendWelcomeEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: user.user_metadata?.name, role: 'client' }),
    });

    await supabase.from('clients').update({ welcomeEmailSent: true }).eq('email', email);
  }
};
