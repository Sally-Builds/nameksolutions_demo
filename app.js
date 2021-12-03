const path = require('path');
const express = require('express');

const app = express();
app.enable('trust proxy');


app.use(express.json());

//testing middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//serving static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(`${path.join(__dirname)}/public/img`));
app.use(express.static(`${__dirname}/public/`));
app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});