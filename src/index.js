require('./models/User');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

const mongoURI =
  'mongodb+srv://admin:root@cluster0.lhxwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB error: ', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
