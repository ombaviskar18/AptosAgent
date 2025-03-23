import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  // Validate environment variable
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' }, 
      { status: 500 }
    );
  }

  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Parse request body
    const { prompt, model = 'gpt-3.5-turbo' } = await request.json();

    // Validate prompt
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }

    // Generate code suggestion using OpenAI
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI that generates code suggestions for a React Ping Pong game. 
          Provide a JavaScript function that modifies game state. 
          Use only setGameState for updates. 
          Focus on game mechanics or scoring changes.
          Wrap the code in a function that takes setGameState as a parameter.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    // Extract the suggestion from the response
    const suggestion = response.choices[0].message.content.trim();

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestion', details: error.message }, 
      { status: 500 }
    );
  }
}