const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded())
let received = []

app.get("/", (req, res) => {
	res.send({logs: received});
});

app.post("/", (req,res) => {
	received.push(JSON.parse(req.body.payload))
	res.status(200).send();
});

app.listen(process.env.PORT);
