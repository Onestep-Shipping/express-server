const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
  const { file } = req.files;
  const fileLocation = './files/' + file.name;
  file.mv(fileLocation, (err) => {
    if (!err) {
      res.send({ fileLocation });
    } else {
      console.log(err);
    }
  });
});

router.get('/download', (req, res) => {
  let { url } = req.query;
  res.contentType("application/pdf");
  res.download(url);
});

module.exports = router; 
