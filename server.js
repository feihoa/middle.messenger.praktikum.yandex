import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('/', function(req, res) {
  res.status(200).sendFile(path.join(__dirname, './dist/index.html'))
})

app.get('*', function(req, res) {
  res.redirect('/');
})

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
}); 
