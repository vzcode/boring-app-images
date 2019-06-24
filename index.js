const AWS = require('aws-sdk');
const fs = require('fs');
const fetch = require("node-fetch");

const imagesUrl = 'https://loremflickr.com/320/240/eggs';

const s3 = new AWS.S3({
    accessKeyId: process.env.s3AccessKey,
    secretAccessKey: process.env.s3secretKey
})

exports.handler = async () => {
    const downloadFile = (async (url) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream('tempImage.jpg');
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function () {
            resolve();
            console.log('Image downloaded from API and created');
        });
    });
    });

    const uploadFile = () => {
        fs.readFile('./tempImage.jpg', function(err, imageFile) {
            let params = {
                Bucket: 'bas-c',
                Key: 'bg.jpg',
                Body: imageFile,
                ContentType: 'binary'
            }
            s3.upload(params, function(err,data) {
                if (data) {
                    console.log('Upload success')
                }
            })
        })
    };

    const response = () => {
        downloadFile(imagesUrl).then(() => uploadFile());
    };

    response();
};

exports.handler = async function (event, context) {
    console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2))
    console.log("EVENT\n" + JSON.stringify(event, null, 2))
    return context.logStreamName
};






