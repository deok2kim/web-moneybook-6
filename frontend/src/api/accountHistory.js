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

export const createAccountHistory = async (params) => {
  const res = await fetch(`${BASE_URL}/money_book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};

export const updateAccountHistory = async (params) => {
  const res = await fetch(`${BASE_URL}/money_book/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};
