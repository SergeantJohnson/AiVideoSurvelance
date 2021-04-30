video="";
status="";

vol=0;
spd=0;

objects=[];

function preload() {
   video=createVideo('video.mp4');
   video.hide();
}

function setup() {
  canvas=createCanvas(480,380);
  canvas.center();
}

function draw() {
  image(video,0,0,480,380);
  if(status!="") {
    objectDetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++) {
        document.getElementById("status").innerHTML="Status: Objects are detected";
        document.getElementById("number_of_objects").innerHTML="Number of Objects= "+objects.length;

        fill('#3003fc');
        percentage=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke('#3003fc');
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
  }  
}

function start() {
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelLoaded() {
    console.log("model loaded");
    status=true;
    video.loop();
    
}

function slider_value() {
    vol=document.getElementById("volume").value;
    spd=document.getElementById("speed").value;
    console.log("volume="+vol);
    console.log("Speed="+spd);
    video.speed(spd);
    video.volume(vol);
}

function pause() {
    video.pause();
}

function stop() {
    video.stop();
}

function gotResults(error,results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects=results;
}