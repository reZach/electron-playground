// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



var AWS = require('aws-sdk'); // Load the SDK for JavaScript
AWS.config.update({region: 'us-east-1'}); // Set the region 
var s3 = new AWS.S3({apiVersion: '2006-03-01'}); // Create S3 service object
                    
var params = {
    Bucket: "bucket",
    Key: "key"
};
s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
    /*
    data = {
    AcceptRanges: "bytes", 
    ContentLength: 3191, 
    ContentType: "image/jpeg", 
    ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
    LastModified: <Date Representation>, 
    Metadata: {
    }, 
    TagCount: 2, 
    VersionId: "null"
    }
    */
});



// Seems dumb we need this too to prevent the savse
// dialog box from popping up when we drag over...
function dragover_handler(event){
    event.preventDefault();
}
function drop_handler(event) {
    event.preventDefault();

    var dt = event.dataTransfer;
    var files = dt.files;
    var file = files[0];
    
    var img = document.createElement("img");
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        img.src = event.target.result;
        document.body.appendChild(img);
    }
}


document.querySelector(".image-upload").addEventListener("dragover", dragover_handler, false);
document.querySelector(".image-upload").addEventListener("drop", drop_handler, false);