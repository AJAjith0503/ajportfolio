'use server';

import { Resend } from 'resend';

export async function sendEmail(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing in environment variables');
    return { error: 'Server configuration error: Missing API Key' };
  }

  const resend = new Resend(apiKey);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('Attempting to send email:', { name, email });

  if (!name || !email || !message) {
    return { error: 'Please fill in all fields.' };
  }


  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ajajithm1781@gmail.com',
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Unexpected Error:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
}
