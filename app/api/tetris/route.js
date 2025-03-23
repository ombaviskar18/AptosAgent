import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { prompt, model = 'gpt-4o' } = await request.json();

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates code suggestions for a Tetris game. Focus on providing concise, functional React component code modifications.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300
    });

    const suggestion = response.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 });
  }
}