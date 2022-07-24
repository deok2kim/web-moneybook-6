const BASE_URL = 'http://localhost:5001/api';

export const getCategory = async () => {
  const res = await fetch(`${BASE_URL}/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};
