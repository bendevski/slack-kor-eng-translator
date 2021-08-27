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
	const {message, response_url} = JSON.parse(req.body.payload)
	const {text} = message;
	res.status(200).send();
	const body = {
		"source": "ko",
		"target": "en",
		"text": text
	}
	
	console.log({body:body, headers:TRANS_HEADERS})
	let translated;
	try{
		translated = await axios.post("https://openapi.naver.com/v1/papago/n2mt", body,{headers: TRANS_HEADERS});
	} 
	catch (err){
		console.log(err);
		return;
	}
	const {translatedText} = translated.data.message.result;
	try{
		await axios.post(response_url,{text:translatedText}, {headers:{"Content-type": "application/json"}});
	}
	catch (err){
		console.log(err);
		return;
	}
});

app.listen(process.env.PORT);
