const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

const PORT = 1337
app.listen(PORT, () => {
  console.log(`Serving silly sounds in PORT ${PORT}`)
})