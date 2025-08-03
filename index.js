// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Challenge
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  let unixFormat, utcFormat, dateObj;
  let isUnix = /^\d+$/.test(date);
  // Check if date is undefined or empty
  if (!date) {
    dateObj = new Date();
  }

  else if (date && isUnix) {
    unixFormat = parseInt(date);
    dateObj = new Date(parseInt(date));
  }

  else if (date && !isUnix) {
    // Check if date is in valid format
    dateObj = new Date(date);
    // If date is invalid, return error
    if (dateObj.toString() === 'Invalid Date') {
       res.json({ error: 'Invalid Date' });
        return;
      }
      unixFormat = dateObj.getTime();
      utcFormat = dateObj.toUTCString(); 
  }
  // Return unix and utc format
 res.json({
    unix: unixFormat,
    utc: utcFormat
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
