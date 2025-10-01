import axios from 'axios';

export default async function handler(req, res) {
  const newsApiKey = process.env.NEWS_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?q=gaza&language=de&pageSize=5&apiKey=${newsApiKey}`
  );

  const articles = response.data.articles;
  const combinedText = articles.map(a => `Titel: ${a.title}\nInhalt: ${a.description || ''}`).join('\n\n');

  const gptResponse = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Fasse die folgenden Nachrichten zum Thema Gaza in einem neutralen, journalistischen Ton zusammen. Keine Meinungen, nur Fakten. Keine Wiederholungen.'
        },
        {
          role: 'user',
          content: combinedText
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const summary = gptResponse.data.choices[0].message.content;
  res.status(200).json({ summary });
}
