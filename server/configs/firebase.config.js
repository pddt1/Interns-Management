const admin = require('firebase-admin')
var serviceAccount = require("./interns-cv-firebase-adminsdk-kfggg-6df88909d4.json");
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount ),
  storageBucket: 'interns-cv.appspot.com'
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}
