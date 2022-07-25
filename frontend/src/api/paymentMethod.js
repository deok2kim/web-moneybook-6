const BASE_URL = 'http://localhost:5001/api';

export const getPaymentMethod = async () => {
  const res = await fetch(`${BASE_URL}/payment_method`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};
