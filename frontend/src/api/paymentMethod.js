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

export const createPaymentMethod = async (params) => {
  const res = await fetch(`${BASE_URL}/payment_method`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};
