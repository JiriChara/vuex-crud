/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');
const Ipsum = require('bavaria-ipsum');
const bodyParser = require('body-parser');
/* eslint-enable */

const app = express();
const compiler = webpack(WebpackConfig);
const ipsum = new Ipsum();

const articles = [
  {
    id: 1,
    title: ipsum.generateSentence(),
    content: ipsum.generateParagraph()
  },
  {
    id: 2,
    title: ipsum.generateSentence(),
    content: ipsum.generateParagraph()
  },
  {
    id: 3,
    title: ipsum.generateSentence(),
    content: ipsum.generateParagraph()
  }
];

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

app.get('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a.id.toString() === req.params.id);
  const index = articles.indexOf(article);

  res.json(articles[index]);
});

app.patch('/api/articles/:id', (req, res) => {
  const { body } = req;
  const article = articles.find(a => a.id.toString() === req.params.id);
  const index = articles.indexOf(article);

  if (index >= 0) {
    article.title = body.title;
    article.content = body.content;
    articles[index] = article;
  }

  res.json(article);
});

app.put('/api/articles/:id', (req, res) => {
  const { body } = req;
  const article = articles.find(a => a.id.toString() === req.params.id);
  const index = articles.indexOf(article);

  if (index >= 0) {
    article.title = body.title;
    article.content = body.content;
    articles[index] = article;
  }

  res.json(article);
});

app.delete('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a.id.toString() === req.params.id);
  const index = articles.indexOf(article);

  if (index >= 0) articles.splice(index, 1);

  res.status(202).send();
});

app.post('/api/articles', (req, res) => {
  const id = articles[articles.length - 1].id + 1;
  const { body } = req;

  const article = {
    id,
    title: body.title,
    content: body.content
  };

  articles.push(article);

  res.json(article);
});

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
  /* eslint-enable no-console */
});
