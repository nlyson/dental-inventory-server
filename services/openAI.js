/**
 * OpenAI API client for equipment analysis
 */

const SYSTEM_PROMPT = `You are a dental equipment inventory analyst. Your task is to analyze dental procedure data and determine what equipment and supplies were likely used.

For each procedure, identify:
1. The specific equipment items used
2. Consumable supplies that would need restocking
3. Estimated quantities based on procedure type

Return your analysis as a JSON object with the following structure:
{
  "equipment": [
    {
      "name": "Equipment name",
      "category": "Category (e.g., Instruments, Consumables, PPE)",
      "quantity": number,
      "procedures": ["List of procedure codes that used this"]
    }
  ],
  "summary": {
    "totalProcedures": number,
    "uniqueEquipmentTypes": number,
    "categories": {
      "categoryName": count
    }
  }
}

Be thorough but practical. Focus on items that actually need tracking for inventory purposes.`;

async function analyzeEquipment(procedures) {
  const apiUrl = process.env.OPENAI_API_URL;
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiUrl || !apiKey) {
    throw new Error('OpenAI configuration missing. Check OPENAI_API_URL and OPENAI_API_KEY environment variables.');
  }

  const userMessage = `Analyze the following dental procedures and identify the equipment and supplies used:\n\n${JSON.stringify(procedures, null, 2)}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No response content from OpenAI');
  }

  return JSON.parse(content);
}

module.exports = { analyzeEquipment };
