// This function acts as a secure proxy to the OpenAI API.

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { messages } = JSON.parse(event.body);
  const apiKey = process.env.OPENAI_API_KEY;

  // Check if the API key is available
  if (!apiKey) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'The OPENAI_API_KEY environment variable is not set.' }) 
    };
  }

  try {
    // Forward the request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages, // Pass the messages from the client directly
      }),
    });

    const data = await response.json();

    // Return the response from OpenAI to the client
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
