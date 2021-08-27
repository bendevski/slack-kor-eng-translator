const express = require('express');

const app = express();
app.use(express.json());

let received = []

app.get("/", (req, res) => {
	res.send({logs: received});
});

app.post("/", (req,res) => {
	received.push(req);
});

app.listen(process.env.PORT);
