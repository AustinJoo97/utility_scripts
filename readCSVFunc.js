let fs = require('fs'); 
let parse = require("csv-parser");

let csvData=[];
fs.createReadStream(__dirname + '')
.pipe(parse({delimiter: ','}))
.on('data', function(csvrow) {
    console.log(csvrow);
    //do something with csvrow
    csvData.push(csvrow);        
})
.on('end',function() {
    //do something with csvData
    console.log(csvData);
});