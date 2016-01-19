/* 
 Created on : 18/01/2016, 23:40:32
 Author     : Germano "germanosk" Assis <germanobioinfo@gmail.com>
 */

/**
 * Given a Image.src it returns in grayscale
 * 
 * @param {Image.src} src
 * @returns {Image.src}
 */
function gray(src) {
    var imgObj = new Image();
    imgObj.src = src;
    
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');

    var imgW = imgObj.width;
    var imgH = imgObj.height;
    canvas.width = imgW;
    canvas.height = imgH;

    canvasContext.drawImage(imgObj, 0, 0);
    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

    for (var y = 0; y < imgPixels.height; y++) {
        for (var x = 0; x < imgPixels.width; x++) {
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

    return canvas.toDataURL();
}
/**
 * Given a Image.src it returns with a text applyed
 * 
 * @param {Image.src} src
 * @returns {Image.src}
 */
function text(src) {
    var imgObj = new Image();
    imgObj.src = src;
    
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');

    var imgW = imgObj.width;
    var imgH = imgObj.height;
    canvas.width = imgW;
    canvas.height = imgH;

    canvasContext.drawImage(imgObj, 0, 0);
    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    var fSize = imgW / 8;
    canvasContext.font = 'normal bold ' + fSize + 'px GTA';

    canvasContext.textAlign = 'center';
    var label = "OWNED";
    if ($("#texto").val() !== "")
    {
        label = $("#texto").val();
    }
    drawStroked(label, imgW / 2, imgH / 2, canvasContext);
    return canvas.toDataURL();
}
/**
 * Draw the text in the given Canvas Context
 * 
 * @param {string} text Text to be Stroked
 * @param {int} x X-Axis text position
 * @param {int} y Y-Axis text position
 * @param {Canvas Context} ctx Target Canvas Context
 * @returns {undefined}
 */
function drawStroked(text, x, y, ctx) {
    ctx.font = (x / 4) + "px GTA";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'red';
    ctx.fillText(text, x, y);
}
/**
 * Function to prevent default execution of Drag Enter Event
 * @param {type} ev Drag Enter Event
 * @returns {Boolean} always true
 */
function dragEnter(ev) {
    ev.preventDefault();
    return true;
}

/**
 * Function to prevent default execution of Drag Over Event
 * Change Style of Black named elements to Cyan to give
 * visual feedback to user
 * 
 * @param {type} ev Drag Over Event
 * @returns {undefined}
 */
function dragOver(ev) {
    $(".black").css('background-color', "cyan");
    ev.preventDefault();
}
/**
 * Function to prevent default execution of Drag Drop Event
 * 
 * @param {type} ev Drag Drop Event
 * @returns {Boolean} always false
 */
function dragDrop(ev) {
    $(".black").css('background-color', "grey");
    ev.preventDefault();
    ev.stopPropagation();
    //Getting droped files
    var data = ev.dataTransfer.files;
    //Instanciating a File Reader
    var reader = new FileReader();
    //Registering function to be executed after file loaded
    reader.onload = function (e) {
        //Associating loaded file as source of #js-image
        $('#js-image').attr('src', e.target.result);
        //Applying grayscale to #js-image src the associating it back
        $('#js-image').attr('src', gray($('#js-image').attr('src')));
        //Applying text to #js-image
        $('#js-image').attr('src', text($('#js-image').attr('src')));
    };
    reader.readAsDataURL(data[0]);
    return false;
}