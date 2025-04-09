// pages/api/sendWelcomeEmail.ts
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('📩 /api/sendWelcomeEmail was triggered');

  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, role } = req.body;
  console.log('📦 Incoming data:', { email, name, role });

  if (!email || !role) {
    return res.status(400).json({ success: false, error: 'Missing email or role' });
  }

  const subject = role === 'healer'
    ? 'Welcome to Meloa, guide 💜'
    : 'Welcome to Meloa, your healing journey begins 💫';

  const dashboardLink = role === 'healer'
    ? 'https://joinmeloa.com/dashboard'
    : 'https://joinmeloa.com/client/dashboard';

  const html = `
    <p>Hi ${name || 'there'},</p>
    <p>Welcome to <strong>Meloa</strong> — we're so glad you're here.</p>
    <p>${role === 'healer'
      ? 'You can now connect with clients and share your healing gifts with the world.'
      : 'You’re all set to explore creative therapy and start your journey with one of our guides.'}</p>
    <p><a href="${dashboardLink}">Log in to your dashboard →</a></p>
    <br />
    <p>💜 The Meloa Team</p>
  `;

  try {
    const result = await resend.emails.send({
      from: 'hello@joinmeloa.com',
      to: email,
      subject,
      html,
    });

    console.log('✅ Email sent successfully:', result);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Error sending welcome email:', err);
    res.status(500).json({ error: err.message });
  }
}
