const { default: axios } = require('axios');
const express = require('express');
const {TRANS_HEADERS} = require('./env.json');
const app = express();
app.use(express.json());
app.use(express.urlencoded())
let received = []

app.get("/", (req, res) => {
	res.send({logs: received});
});

app.post("/", async (req,res) => {
	const {text} = JSON.parse(req.body.payload)
	res.status(200).send();
	const body = {
		"source": "ko",
		"target": "en",
		"text": text
	}
	try{
		let translated = await axios.post("https://openapi.naver.com/v1/papago/n2mt",headers=TRANS_HEADERS, body=body);
	} catch{(err)=>console.log(err)}
	received.push(translated);
});

app.listen(process.env.PORT);
