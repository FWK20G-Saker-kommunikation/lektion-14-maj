const express = require('express');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.static('../frontend'));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(8000, () => {
  console.log('Server started');
});