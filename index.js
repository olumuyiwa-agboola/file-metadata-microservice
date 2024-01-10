// ------SETUP----------------------------------------------------
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// create express server
const app = express();

// mount body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mount cors for freeCodeCamp tests
app.use(cors());

// serve static assets & index.html
app.use(express.static(`${process.cwd()}/public`))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// ------ROUTES-------------------------------------------------------
// retrieve file metadata
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// -----LISTEN FOR REQUESTS---------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
