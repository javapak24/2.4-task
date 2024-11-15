// const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3')
// const { S3 } = require('@aws-sdk/client-s3')
// const express = require('express')
// var cors = require('cors')
// const app = express();
// app.use(cors());

// const s3Client = new S3Client({
//     region: 'us-east-1',
//     endpoint: 'http://localhost:4566',
//     forcePathStyle: true
// })

// const listObjectsParams = {
//     Bucket: 'myawsbucket1point5'
// }

// listObjectsCmd = new ListObjectsV2Command(listObjectsParams)

// app.get('/images', (req, res) => {
//     listObjectsParams = {
//         Bucket: 'myawsbucket1point5'
//     }
//     s3Client.send(new ListObjectsV2Command(listObjectsParams))
//         .then((listObjectsResponse) => {
//             res.send(listObjectsResponse)
//     })
// })


// const fs = require('fs')
// const fileUpload = require('express-fileupload')
// app.post('/images', (req, res) => {
//     const file = req.files.image
//     const fileName = req.files.image.name
//     const tempPath = `${UPLOAD_TEMP_PATH}/${fileName}`
//     file.mv(tempPath, (err) => { res.status(500) })

//   // code that does stuff to upload the file and return a response
// })

// const PORT = process.env.PORT || 8080;

// //Server
// app.listen(PORT, ()=>{
//     console.log('server is running on 8080');
// });

// EVERYTHING ABOVE IS FROM BEFORE 11/14/24

const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]

  // get secure url from our server
  const { url } = await fetch("/s3Url").then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  const imageUrl = url.split('?')[0]
  console.log(imageUrl)

  // post requst to my server to store any extra data
  
  
  const img = document.createElement("img")
  img.src = imageUrl
  document.body.appendChild(img)
})