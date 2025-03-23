import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { prompt, model = 'gpt-3.5-turbo' } = await request.json();

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates code suggestions for a Snake game.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const suggestion = response.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 });
  }
}