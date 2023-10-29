/* eslint-disable */
import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

['/', '/sign-up', '/settings', '/messenger', '/404', '/500'].forEach(route => {
  app.get(route, function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './dist/index.html'));
  })
});

app.get('*', function (req, res) {
  res.redirect('/404');
})

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
}); 
