router.get('/download/:id', auth, async (req, res) => {
  
    const s3 = new AWS.S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
      apiVersion: '2006-03-01'
    })
    let job = await Job.findById(req.params.id);
  
    if (!job) {
      return res.status(404).send({ message: "Job not found" })
    } else if (job.filesData.length <= 0) {
      return res.status(404).send({ message: "No files" })
    }
  
    const fileList = job.filesData
    console.log(fileList)
  
    const urls = {}
  
    for (let i = 0; i < fileList.length; i++) {
      fileKey = fileList[i].Key
      // let urlL = ''
  
      const params = {
        Expires: 60,
        Key: fileKey,
        Bucket: config.AWS_BUCKET_NAME,
      };
      const url = s3.getSignedUrl('getObject', params, function put(err, url) {
              if (err) console.log(err, err.stack);
              else console.log(url);console.log(fileKey)
              urlL = url
              return {url}
             });
             console.log(urlL)
             console.log(url)
      urls[fileKey] = urlL
    }
  console.log(urls)
    return res.send({ urls })
  });