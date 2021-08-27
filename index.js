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
	const {message} = JSON.parse(req.body.payload)
	const {text} = message;
	res.status(200).send();
	const body = {
		"source": "ko",
		"target": "en",
		"text": text
	}
	
	console.log({body:body, headers:TRANS_HEADERS})
	try{
		let translated = await axios.post("https://openapi.naver.com/v1/papago/n2mt", body,{headers: TRANS_HEADERS});
		console.log(translated);
	} 
	catch (err){
		console.log(err);
	}
});

app.listen(process.env.PORT);
