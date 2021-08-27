const express = require('express');

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	console.log(req.body);
});

app.listen(8000);
