const express = require('express');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.post(
  '/bfhl',
  [
    body('user_id').notEmpty(),
    body('college_email').isEmail(),
    body('college_roll').isString(),
    body('numbers').isArray(),
    body('alphabets').isArray(),
  ],
  validateRequest,
  (req, res) => {
    const {
      user_id,
      college_email,
      college_roll,
      numbers,
      alphabets } = req.body;

    const response = {
      status: 'Success',
      user_id: user_id,
      college_email: college_email,
      college_roll: college_roll,
      numbers: numbers,
      alphabets: alphabets,
    };

    res.json(response);
  }
);

app.get('/bfhl', (req, res) => {
  const response = {
    operation_code: 1,
  };

  res.status(200).json(response);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
