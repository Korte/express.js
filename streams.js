var fs = require('fs');

var inputFile = './users.json';
var outputFile = './output.json';

var readable = fs.createReadStream(inputFile);
var writeable = fs.createWriteStream(outputFile);

readable.pipe(writeable);
