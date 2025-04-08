// pages/api/sendBookingEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    therapistEmail,
    therapistName,
    clientEmail,
    clientName,
  } = req.body;

  if (!therapistEmail || !therapistName || !clientEmail || !clientName) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Therapist email
    const therapistEmailData = await resend.emails.send({
      from: 'booking@joinmelona.com',
      to: therapistEmail,
      replyTo: 'hello@joinmelona.com',
      subject: `📩 New Booking Request from ${clientName}`,
      html: `
        <p>Hi ${therapistName},</p>
        <p>You’ve received a new session request from <strong>${clientName}</strong> on Meloa.</p>
        <p><a href="https://joinmelona.com/dashboard">Go to your dashboard to respond</a>.</p>
        <br>
        <p>💜 The Meloa Team</p>
      `,
    });

    // Client confirmation email
    const clientEmailData = await resend.emails.send({
      from: 'booking@joinmelona.com',
      to: clientEmail,
      replyTo: 'hello@joinmelona.com',
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

    res.status(200).json({ success: true, therapistEmailData, clientEmailData });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error });
  }
}
