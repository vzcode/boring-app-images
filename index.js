const AWS = require('aws-sdk');
const imagesUrl = 'https://loremflickr.com/320/240/food';
const s3 = new AWS.S3({
    accessKeyId: '[insert]',
    secretAccessKey: '[insert]'
})
const fileName = 'file.jpg';


var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
out = fs.createWriteStream('file.jpg');




const uploadFile = () => {
    fs.readFile(fileName, (err, data) => {
       if (err) throw err;
       const params = {
           Bucket: '[here]', // pass your bucket name
           Key: 'bg.jpg', // file will be saved as testBucket/contacts.csv
           Body: JSON.stringify(data, null, 2)
       };
       s3.upload(params, function(s3Err, data) {
           if (s3Err) throw s3Err
           console.log(`File uploaded successfully at ${data.Location}`)
       });
    });
  };
//   new FetchStream(imagesUrl).pipe(out);
//   uploadFile();

var getImage = new Promise((resolve, reject) => {
    new FetchStream(imagesUrl).pipe(out);
    console.log('Image downloaded from API and created')
})

var uploadImage = new Promise((resolve, reject) => {
    uploadFile();
    console.log('Image uploaded to s3');
})

function all() {
    Promise.all([getImage]).then(uploadImage);
}

all();