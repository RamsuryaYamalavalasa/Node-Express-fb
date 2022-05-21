
var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore()

const  users=db.collection('users')

module.exports=users