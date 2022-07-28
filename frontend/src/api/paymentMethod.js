const BASE_URL = process.env.BASE_URL;

export const getPaymentMethod = async () => {
  const res = await fetch(`${BASE_URL}/api/payment_method`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};

export const createPaymentMethod = async (params) => {
  const res = await fetch(`${BASE_URL}/api/payment_method`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};

export const deletePaymentMethod = async (params) => {
  const res = await fetch(`${BASE_URL}/api/payment_method/${params.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};
