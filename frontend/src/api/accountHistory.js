const BASE_URL = 'http://localhost:5001/api';

export const getAccountHistory = async (month) => {
  const res = await fetch(`${BASE_URL}/money_book/${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};
