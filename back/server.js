import express from 'express'
import { generateUploadURL } from './s3.js'
import cors from 'cors'


const corsOptions = {
  origin: "http://127.0.0.1:5502",
};



const app = express()

//reference client index.js?
app.use(express.static('front'))
app.use(cors(corsOptions));

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(5501, () => console.log("listening on port 5501"))