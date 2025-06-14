import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI properly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // your secret key from Vercel
});

export async function POST(req) {
  const { messages } = await req.json();
console.log("💡 OPENAI KEY:", process.env.OPENAI_API_KEY);


  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',  // model you're using
      messages: [
        { role: 'system', content: 'You are GREEN AI, a helpful tutor trained on Class 12 Mathematics and Biology.' },
        ...messages,
      ],
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('OpenAI API error:', err);  // very important for debugging
    return NextResponse.json({ reply: 'API error. Please try again.' });
  }
}
