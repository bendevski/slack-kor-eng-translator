const express = require('express');

const app = express();
app.use(express.json());

let received = []

app.get("/", (req, res) => {
	res.send({logs: received});
});

app.post("/", (req,res) => {
	console.log(req.payload);
	res.status(200).send();
});

app.listen(process.env.PORT);
