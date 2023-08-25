export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const BASE_URL = 'http://0.0.0.0:8000/api';

export default async function requestAPI(
  url: string,
  method: HTTP_METHOD,
  body?: any
): Promise<any> {
  try {
    const baseUrl = BASE_URL;
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        "Content-Type": "application/json", // Adjust headers as needed
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
}
