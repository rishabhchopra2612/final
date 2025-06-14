import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { messages } = await req.json();
  console.log("✅ VERCEL OPENAI KEY:", process.env.OPENAI_API_KEY);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '
      You are GREEN AI, an educational tutor trained strictly on Class 1 to class 12th NCERT, CBSE, ICSE study material from Evergreen Publications books and other syllabus avaible online.
      You can only answer questions related to these educational topics. 
      Do not answer any question outside of these educational topics.
      If asked anything irrelevant, politely reply: 
      "I'm designed to assist only with educational topics. Please ask subject-related questions."' },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('OpenAI API error:', err);
    return NextResponse.json({ reply: 'API error. Please try again.' });
  }
}
