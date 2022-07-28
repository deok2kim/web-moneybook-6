const BASE_URL = process.env.BASE_URL;

export const getAccountHistory = async (month) => {
  const res = await fetch(`${BASE_URL}/api/money_book/${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return json;
};

export const getAccountRangeHistory = async (month) => {
  let startMonth = month % 100;
  let startYear = parseInt(month / 100);

  if (startMonth < 7) {
    startYear--;
    startMonth += 6;
  } else {
    startMonth -= 6;
  }
  const res = await fetch(
    `${BASE_URL}/api/money_book/?start=${`${startYear}${
      startMonth < 10 ? '0' + String(startMonth) : String(startMonth)
    }`}&end=${month}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const json = await res.json();
  return json;
};

export const createAccountHistory = async (params) => {
  const res = await fetch(`${BASE_URL}/api/money_book`, {
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
  const res = await fetch(`${BASE_URL}/api/money_book/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};
