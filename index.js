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
  let dateString = req.params.date;
  let dateObj;

  // If no date parameter, use current date
  if (!dateString) {
    dateObj = new Date();
  } else if (/^\d+$/.test(dateString)) {
    // If it's all digits, treat as unix ms timestamp
    // Parse as number since new Date('1451001600000') and new Date(1451001600000) behave differently
    dateObj = new Date(Number(dateString));
  } else {
    // Otherwise, treat as a date string
    dateObj = new Date(dateString);
  }

  // Check for invalid date
  if (dateObj.toString() === 'Invalid Date') {
    res.json({ error: "Invalid Date" });
    return;
  }
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
