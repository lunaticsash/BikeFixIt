import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const testClaude = async () => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: 'Say hello and confirm you are working, in one sentence.',
        },
      ],
    });

    console.log(response.content[0].text);
  } catch (error) {
    console.error('Claude API Error:', error.message);

    if (error.message.includes('credit balance')) {
      console.error('Your Anthropic API account has low/no credits.');
    }
  }
};

testClaude();