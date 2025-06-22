export const MODEL_BASE_URL = process.env.NEXT_PUBLIC_MODEL_BASE_URL!;

export const stdFetch = async (endpoint: string, config = {}) => {
  try {
    const response = await fetch(endpoint, config);

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch');
    }
  } catch (error) {
    console.error('Error during request:', error);
    throw error;
  }
};

export const post = (endpoint: string, body: object, token?: string) => {
  return stdFetch(endpoint, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: token
      ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      : { 'Content-Type': 'application/json' }
  });
}

export const get = async (endpoint: string, token?: string) => {
  return stdFetch(endpoint, {
    method: 'GET',
    headers: token
      ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      : { 'Content-Type': 'application/json' }
  });
}