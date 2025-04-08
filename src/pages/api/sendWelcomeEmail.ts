// pages/api/sendWelcomeEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ success: false, error: 'Missing email or role' });
  }

  const isHealer = role === 'healer';

  const subject = isHealer
    ? 'Welcome to Meloa, guide 💜'
    : 'Welcome to Meloa, your healing journey begins 💫';

  const greeting = name ? `Hi ${name},` : `Hi there,`;

  const dashboardLink = isHealer
    ? 'https://joinmelona.com/dashboard'
    : 'https://joinmelona.com/client/dashboard';

  const html = `
    <p>${greeting}</p>
    <p>Welcome to <strong>Meloa</strong> — we're so glad you're here.</p>
    <p>${isHealer
      ? 'You can now connect with clients and share your healing gifts with the world.'
      : 'You’re all set to explore creative therapy and start your journey with one of our guides.'}</p>
    <p><a href="${dashboardLink}">Log in to your dashboard →</a></p>
    <br />
    <p>💜 The Meloa Team</p>
  `;

  try {
    const welcomeRes = await resend.emails.send({
      from: 'hello@joinmelona.com',
      to: email,
      subject,
      html,
    });

    res.status(200).json({ success: true, welcomeRes });
  } catch (error) {
    console.error('Welcome email error:', error);
    res.status(500).json({ success: false, error });
  }
}
