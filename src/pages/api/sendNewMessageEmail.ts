// pages/api/sendNewMessageEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sender, recipientEmail, recipientName, messagePreview } = req.body;

  if (!sender || !recipientEmail || !recipientName || !messagePreview) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const isFromTherapist = sender === 'therapist';

    const subject = isFromTherapist
      ? '✨ New message from your guide on Meloa'
      : '💬 New message from your client on Meloa';

    const greeting = isFromTherapist
      ? `Hi ${recipientName},`
      : `Hey ${recipientName},`;

    const html = `
      <p>${greeting}</p>
      <p>You have a new message on <strong>Meloa</strong>:</p>
      <blockquote style="border-left: 2px solid #ccc; margin: 1em 0; padding-left: 1em;">
        ${messagePreview}
      </blockquote>
      <p><a href="https://joinmelona.com/dashboard">View and reply in your dashboard →</a></p>
      <br />
      <p>💜 The Meloa Team</p>
    `;

    const emailRes = await resend.emails.send({
      from: 'noreply@joinmelona.com',
      to: recipientEmail,
      replyTo: 'hello@joinmelona.com',
      subject,
      html,
    });

    res.status(200).json({ success: true, emailRes });
  } catch (error) {
    console.error('Message email error:', error);
    res.status(500).json({ success: false, error });
  }
}
