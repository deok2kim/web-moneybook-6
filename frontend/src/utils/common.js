export const calculateMonth = (currentYearMonth, isNext) => {
  const data = +currentYearMonth;
  const year = parseInt(data / 100);
  const month = data % 100;
  if (isNext) {
    return month === 12 ? `${year + 1}01` : `${year}${(month + 1).fillZero(2)}`;
  } else {
    return month === 1 ? `${year - 1}12` : `${year}${(month - 1).fillZero(2)}`;
  }
};

export const setComma = (value) => {
  if (typeof value !== 'string') value = value.toString();
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

Number.prototype.fillZero = function (width) {
  let n = String(this);
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

export const setCurrentDate = () => {
  return `${new Date().getFullYear()}-${(new Date().getMonth() + 1).fillZero(
    2,
  )}-${new Date().getDate().fillZero(2)}`;
};

export const isDifferent = (prevData, curData) => {
  // 현재 데이터(curData 의 6가지 데이터 (amount, category, content, date, id, paymentMethod) 를 기준으로 비교)
  return Object.keys(curData).some((key) => prevData[key] !== curData[key]);
};
