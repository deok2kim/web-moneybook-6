const BASE_URL = process.env.BASE_URL;

export const getCategory = async () => {
  const res = await fetch(`${BASE_URL}/api/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};
