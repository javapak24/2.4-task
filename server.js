import express from 'express'
import { generateUploadURL } from './s3'

const app = express()

//reference client index.js?
app.use(express.static(''))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))