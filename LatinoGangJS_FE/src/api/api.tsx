const API_URL = import.meta.env.VITE_API_URL;

export async function processText(text: string): Promise<string> {
  const response = await fetch(`${API_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input:text }),
  });
  console.log(API_URL)
  console.log("input:",text)
  console.log("response:",response)
  if (!response.ok) {
    throw new Error('Failed to process text');
  }

  const data = await response.json();
  console.log("data:",data)
  return data.result;
}
