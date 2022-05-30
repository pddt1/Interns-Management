const firebase = require('../configs/firebase.config');
const {format} = require('util');
const { v4: uuidv4 } = require('uuid');
function uploadHandle(file){
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    } 
    const blob = firebase.bucket.file(req.file.originalname)
    console.log(req.file);
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4()
              }
        }
    })
    blobWriter.on('error', (err) => {
        res.status(500).send("Failed to uplad CV");
        return;
    })
    blobWriter.end(req.file.buffer);
    const publicUrl = format(
        `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${uuidv4()}`
      );
    return publicUrl;
       
}
const upload={
    uploadHandle
}
module.exports =upload;