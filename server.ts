const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/', function (_: any, res: any) {
	res.render('index');
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
