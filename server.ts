const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get(/.*/, function (_: any, res: any) {
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
