var express = require('express');
const uuidv4 = require('uuid/v4')
const aws = require('aws-sdk');

var router = express.Router()

router.get('/sign-s3', (req, res) => {

    console.log('Signing S3')
    const fileType = req.query['file-type'];
  
    const s3 = new aws.S3();
    const fileName = uuidv4();
    console.log({ 'name': fileName, 'type': fileType });
  
    const s3Params = {
      Bucket: 'kitethere',
      Key: 'images/' + fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const s3url = 'https://kitethere.s3.amazonaws.com/images/'+fileName
      const returnData = {
        'signedRequest': data,
        'url': s3url,
        'name': fileName
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
    
  });

  module.exports = router