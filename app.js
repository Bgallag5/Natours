const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
//Helmet helps you secure your Express apps by setting various HTTP headers
//helmet is security middleware, used to block DNS/DDOS
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set Security HTTP headers with helmet
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit to 100 requests from same IP in 1 hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'You have made too many requests to this API in too short a time 🤯',
});
// limit requests on all api routes
app.use('/api', limiter);

//Body parser - reads data from body into req.body - limit body to 10kilobytes
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NoSQL query injections
// checks req.query, req.params, req.body and filter out any symbols ($, .)
app.use(mongoSanitize());

// Data Sanitization against XSS (Cross side scripting attacks)
// cleans user input from malicious HTML code
app.use(xss());

//Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//serving static files
app.use(express.static(`${__dirname}/public`));

//Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
