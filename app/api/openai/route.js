import axios from 'axios';

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      n: 1,
      stop: null,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const code = response.data.choices[0].message.content.trim();
    return new Response(JSON.stringify({ code }), { status: 200 });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate code' }), { status: 500 });
  }
}