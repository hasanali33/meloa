// pages/api/sendBookingEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    therapistEmail,
    therapistName,
    clientName,
    clientEmail,
  } = req.body;

  try {
    // Therapist email
    const therapistEmailData = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ali.h.a.hasan786@gmail.com',
      subject: '📩 New Booking Request on Meloa',
      html: `
        <p>Hey ${therapistName},</p>
        <p>You’ve received a new session request from <strong>${clientName}</strong>.</p>
        <p><a href="https://meloa.app/dashboard">Go to your dashboard to reply</a>.</p>
        <br>
        <p>💜 The Meloa Team</p>
      `,
    });

    // Client confirmation email
    const clientEmailData = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ali.h.a.hasan786@gmail.com',
      subject: '✨ Your Booking Request Was Sent!',
      html: `
        <p>Hi ${clientName},</p>
        <p>Thanks for reaching out on <strong>Meloa</strong> — your message was sent to ${therapistName}.</p>
        <p>They’ll reply soon. You’ll get an email when they respond.</p>
        <br>
        <p>💜 The Meloa Team</p>
      `,
    });

    // Optional: Log success (optional, add if you want to store emails in Supabase later)
    res.status(200).json({ success: true, therapistEmailData, clientEmailData });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error });
  }
}
