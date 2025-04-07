// pages/api/sendNewMessageEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sender, recipientEmail, recipientName, messagePreview } = req.body;

  try {
    const subject = sender === 'therapist'
      ? 'Your guide just replied ✨'
      : 'New message from your client 💬';

    const greeting = sender === 'therapist'
      ? `Hi ${recipientName},`
      : `Hey ${recipientName},`;

    const html = `
      <p>${greeting}</p>
      <p>You have a new message on <strong>Meloa</strong>:</p>
      <blockquote style="border-left: 2px solid #ccc; margin: 1em 0; padding-left: 1em;">
        ${messagePreview}
      </blockquote>
      <p><a href="https://meloa.app/dashboard">View and reply in your dashboard →</a></p>
      <br />
      <p>💜 The Meloa Team</p>
    `;

    const emailRes = await resend.emails.send({
      from: 'notifications@meloa.app',
      to: recipientEmail,
      subject,
      html,
    });

    res.status(200).json({ success: true, emailRes });
  } catch (error) {
    console.error('Message email error:', error);
    res.status(500).json({ success: false, error });
  }
}
