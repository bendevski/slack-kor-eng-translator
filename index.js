const express = require('express');

const app = express();
app.use(express.json());

let received = []

app.get("/", (req, res) => {
	res.send({logs: received});
});

app.post("/", (req,res) => {
	received.push({"body":res.body, "params": res.params, "query": res.query});
});

app.listen(process.env.PORT);
