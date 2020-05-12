const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { file } = req.files;
  const fileLocation = './files/' + file.name
  file.mv(fileLocation, (err) => {
    if (!err) {
      res.send({ fileLocation });
    }
  });
});

module.exports = router; 
