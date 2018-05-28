// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



var AWS = require('aws-sdk'); // Load the SDK for JavaScript
AWS.config.update({region: 'us-east-1'}); // Set the region 
var s3 = new AWS.S3({apiVersion: '2006-03-01'}); // Create S3 service object
                    
// var params = {
//     Bucket: "bucket",
//     Key: "key"
// };
// s3.getObject(params, function (err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data);           // successful response

// });



// Seems dumb we need this too to prevent the savse
// dialog box from popping up when we drag over...
function dragover_handler(event){
    event.preventDefault();
}
function drop_handler(event) {
    event.preventDefault();

    // Clear existing image
    document.querySelector(".image-upload").innerHTML = "";
    document.querySelector(".js-upload-image-filename").innerHTML = "";

    var dt = event.dataTransfer;
    var files = dt.files;
    var file = files[0];
    var slashsplit = file.path.split("\\");
    var filename = slashsplit[slashsplit.length-1];
    
    console.warn(file);
    
    var img = document.createElement("img");
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        img.src = event.target.result;
        img.style.width = "300px";
        img.style.height = "300px";
        document.querySelector(".image-upload").appendChild(img);
        document.querySelector(".js-upload-image-filename").innerHTML = filename;
    }
}

function on_quality_input_blur(event){
    event.preventDefault();
    document.querySelector(".js-upload-image-quality-slider").value = document.querySelector(".js-upload-image-quality-input").value;
}
function on_quality_input_keyup(event){
    event.preventDefault();

    if (event.keyCode === 13){
        document.querySelector(".js-upload-image-quality-slider").value = document.querySelector(".js-upload-image-quality-input").value;
    }    
}
function on_quality_slider_change(event){
    event.preventDefault();
    console.warn(document.querySelector(".js-upload-image-quality-slider").value);
    document.querySelector(".js-upload-image-quality-input").value = document.querySelector(".js-upload-image-quality-slider").value;
}


document.querySelector(".image-upload").addEventListener("dragover", dragover_handler, false);
document.querySelector(".image-upload").addEventListener("drop", drop_handler, false);
document.querySelector(".js-upload-image-quality-slider").addEventListener("input", on_quality_slider_change, false);
document.querySelector(".js-upload-image-quality-input").addEventListener("keyup", on_quality_input_keyup, false);
document.querySelector(".js-upload-image-quality-input").addEventListener("blur", on_quality_input_blur, false);