const express = require('express');

const app = express();
app.use(express.json());

let received = []

app.get("/", (req, res) => {
	setTimeout(()=>console.log(req.body), 10000);
});

app.post("/", (req,res) => {
	received.push(res.body);
};

app.listen(8000);
