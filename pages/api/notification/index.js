import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function sendMessage( NextApiRequest NextApiResponse) {
  const accountSid = process.env.ACCOUNT_SID;
  const token = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone, message } = NextResponse.body;
  // console.log(phone, message);
  client.messages
    .create({
      body: message,
      from: 'YOUR_PHONE_NUMBER',
      to: phone,
    })
    .then((message) =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}