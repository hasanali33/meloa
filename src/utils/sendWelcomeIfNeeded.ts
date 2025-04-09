import { supabase } from '../../lib/supabaseClient';

export const sendWelcomeIfNeeded = async (user: any) => {
  console.log('🚀 sendWelcomeIfNeeded was called');
  const email = user.email;
  const name = user.user_metadata?.name || 'there';

  if (!email) return;

  // ✅ Determine base URL safely for both local and deployed environments
  const baseUrl =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://joinmelona.com'
      : '';

  try {
    // 👉 Check healer table first
    let { data, error } = await supabase
      .from('healers')
      .select('welcome_email_sent')
      .eq('email', email)
      .single();

    if (!error && data) {
      if (data.welcome_email_sent) return;

      console.log('🟣 Sending welcome email to healer...');
      try {
        const res = await fetch(`${baseUrl}/api/sendWelcomeEmail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, role: 'healer' }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error('❌ Healer welcome email failed:', res.status, errText);
        } else {
          console.log('✅ Healer welcome email sent!');
          await supabase.from('healers').update({ welcome_email_sent: true }).eq('email', email);
        }
      } catch (err) {
        console.error('❌ Network error sending healer welcome email:', err);
      }

      return;
    }

    // 👉 Check client table
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('welcome_email_sent')
      .eq('email', email)
      .single();

    if (!clientError && clientData && !clientData.welcome_email_sent) {
      console.log('💙 Sending welcome email to client...');
      try {
        const res = await fetch(`${baseUrl}/api/sendWelcomeEmail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, role: 'client' }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error('❌ Client welcome email failed:', res.status, errText);
        } else {
          console.log('✅ Client welcome email sent!');
          await supabase.from('clients').update({ welcome_email_sent: true }).eq('email', email);
        }
      } catch (err) {
        console.error('❌ Network error sending client welcome email:', err);
      }
    }
  } catch (err) {
    console.error('❌ General error in sendWelcomeIfNeeded:', err);
  }
};
