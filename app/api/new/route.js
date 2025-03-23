import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    const fullPrompt = `CRITICAL GAME COMPONENT GENERATION RULES:
1. Create PURE React functional component using ONLY React core functionality
2. NO import statements
3. Use standard React.useState for state
4. Component MUST be named 'GameComponent'
5. ONLY use React.createElement for rendering
6. NO JSX syntax
7. NO external dependencies
8. Include complete game logic within the component
9. Handle all state and interactions internally
10. Focus on vintage black and white game style
11. Ensure game is playable and interactive

Game Description: ${prompt}

CRITICAL: Return ONLY pure JavaScript React component code that creates a classic black and white style game matching the description.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert React Aptos game component generator. Create pure JavaScript React components with pixelated, black and white aesthetic, using only core React.createElement rendering."
        },
        {
          role: "user",
          content: fullPrompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });

    const generatedCode = completion.choices[0]?.message?.content?.trim() || '';

    // Strict validation of generated code
    const codeMatch = generatedCode.match(/function\s+GameComponent\s*\(\)\s*{[\s\S]*}/);
    if (!codeMatch) {
      return NextResponse.json(
        { error: 'Invalid component structure' },
        { status: 500 }
      );
    }

    const cleanCode = codeMatch[0]
      .replace(/```(jsx?)?/g, '')
      .replace(/```/g, '')
      .trim();

    return NextResponse.json({ code: cleanCode });
  } catch (error) {
    console.error('Game generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate game request limit reached', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';