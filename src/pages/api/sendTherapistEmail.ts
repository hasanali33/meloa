// pages/api/sendTherapistEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { therapistEmail, therapistName, clientName } = req.body;

  if (!therapistEmail || !therapistName || !clientName) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const therapistEmailData = await resend.emails.send({
      from: 'booking@joinmeloa.com',
      to: therapistEmail,
      replyTo: 'hello@joinmeloa.com',
      subject: `📩 New Booking Request from ${clientName}`,
      html: `
        <p>Hi ${therapistName},</p>
        <p>You’ve received a new session request from <strong>${clientName}</strong> on Meloa.</p>
        <p><a href="https://joinmelona.com/dashboard">Go to your dashboard to respond</a>.</p>
        <br>
        <p>💜 The Meloa Team</p>
      `,
    });

    res.status(200).json({ success: true, therapistEmailData });
  } catch (error) {
    console.error('Therapist email error:', error);
    res.status(500).json({ success: false, error });
  }
}
