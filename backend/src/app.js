const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', express.static('dist'));

const moneyBookRouter = require('./router/moneyBook');
const paymentMethodRouter = require('./router/paymentMethod');
const categoryRouter = require('./router/category');

app.use('/api/money_book', moneyBookRouter);
app.use('/api/payment_method', paymentMethodRouter);
app.use('/api/category', categoryRouter);
app.get('/calendar');
app.get('/*.js', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'dist', 'build.js'));
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`SERVER START: PORT-${PORT}`);
});
