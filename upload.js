const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { file } = req.files;
  file.mv('./files/' + file.name, (err) => {
    if (!err) {
      res.send('File uploaded!');
    }
  });
});

module.exports = router; 
