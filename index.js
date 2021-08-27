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
		let translated = await axios.post("https://openapi.naver.com/v1/papago/n2mt", body,TRANS_HEADERS);
		received.push(translated);
	} 
	catch{(err)=>console.log(err)}
});

app.listen(process.env.PORT);
