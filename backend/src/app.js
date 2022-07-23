const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const moneyBookRouter = require('./router/moneyBook');
const paymentMethodRouter = require('./router/paymentMethod');
const categoryRouter = require('./router/category');

app.use('/api/money_book', moneyBookRouter);
app.use('/api/payment_method', paymentMethodRouter);
app.use('/api/category', categoryRouter);

app.listen(PORT, () => {
  console.log(`SERVER START: PORT-${PORT}`);
});
