var canvas;
   var canvasWidth;
   var ctx;
   var x;
   var y;
   var download;
   var data;
   var fileInput;
   var img;




  window.onload = function() {
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    

    creator();
  }

  function creator() {
    img = document.getElementById('meme');

    var deviceWidth = window.innerWidth;;
      canvasWidth = Math.min(900, deviceWidth-20);
  canvasHeight = Math.min(680, deviceWidth-20);
    canvas = document.getElementById('myCanvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;


    ctx = canvas.getContext('2d');

     x = canvas.width/3 - img.width/3;
     y = canvas.height/3 - img.height/3;

    ctx.drawImage(img, x, y);

    ctx.textAlign = 'center';
    ctx.lineWidth  = 10;
    ctx.font = '15pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineJoin = 'round';
    doTransform();


    fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function(e) {

    var reader = new FileReader();
    reader.onload = function(event){

        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('scale').value = 1;
            document.getElementById('rotate').value = 0;
                 x = canvas.width/2 - img.width/2;
     y = canvas.height/2 - img.height/2;
            ctx.drawImage(img,x,y);
            //imgTransform();
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(fileInput.files[0]);




   }, false);

   var controls = document.getElementById('controls');



    scale = document.getElementById('scale');
    scale.addEventListener('change', doTransform, false);

    rotate = document.getElementById('rotate');
    rotate.addEventListener('change', doTransform, false);





  }

  function doTransform() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to center so transformations will apply around this point
    ctx.translate(canvas.width/2, canvas.height/2);

    // Perform scale
    var val = document.getElementById('scale').value;
    ctx.scale(val,val);

    // Perform rotation
    val = document.getElementById('rotate').value;
    ctx.rotate(val*Math.PI/180);

    // Reverse the earlier translation
    ctx.translate(-canvas.width/2, -canvas.height/2);

    // Finally, draw the image
    ctx.drawImage(img, x, y);

    ctx.restore();

    text = document.getElementById('bottom-text').value;
     text = text.toUpperCase();
     wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/4.5, canvasWidth-canvasWidth/3, 30);


    text = document.getElementById('top-text').value;
     text = text.toUpperCase();
     wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/1.5, canvasWidth-canvasWidth/3, 30);

  }




  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) { var testLine = line + words[n] + ' '; var metrics = ctx.measureText(testLine); var testWidth = metrics.width; if (testWidth > maxWidth && n > 0) {
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  }
