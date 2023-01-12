var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('dist'));

app.get('/', function (req, res) {
	res.render('index');
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
