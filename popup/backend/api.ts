// Import statements if needed
// import fetch from 'node-fetch'; // For Node.js
// import fetch from 'isomorphic-fetch'; // For browser

// GET API Request

enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE', 
    PATCH = 'PATCH',
  }

async function request(url: string, method: HTTP_METHOD, body?: JSON): Promise<any> {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json', // Adjust headers as needed
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error(`GET request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  }
  
  