// pages/api/sendClientEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { clientEmail, clientName, therapistName } = req.body;

  if (!clientEmail || !clientName || !therapistName) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const clientEmailData = await resend.emails.send({
      from: 'booking@joinmeloa.com',
      to: clientEmail,
      replyTo: 'hello@joinmeloa.com',
      subject: `✨ Your Session with ${therapistName} is Confirmed!`,
      html: `
        <p>Hi ${clientName},</p>
        <p>Your booking with <strong>${therapistName}</strong> has been received on Meloa.</p>
        <p>They’ll reply soon — we’ll notify you when they do.</p>
        <p><a href="https://joinmelona.com/client/dashboard">View your bookings</a>.</p>
        <br>
        <p>💜 The Meloa Team</p>
      `,
    });

    res.status(200).json({ success: true, clientEmailData });
  } catch (error) {
    console.error('Client email error:', error);
    res.status(500).json({ success: false, error });
  }
}
