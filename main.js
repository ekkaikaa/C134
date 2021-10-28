status1 = ""
objects = [];

function preload() {}

function setup(){
    canvas = createCanvas(380,380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380,380)
    video.hide()
    objectdetector = ml5.objectDetector('cocossd', modelloaded)
    document.getElementById("status1").innerHTML = "status:detecting objects";
}

function draw() {
    image(video,0,0,380,380)
    if(status1 != ""){
        rcolor = random(255)
        gcolor = random(255)
        bcolor = random(255) 
        objectdetector.detect(video,gotresults)
        document.getElementById("status1").innerHTML = "status: object detected"
        document.getElementById("numberofobjects").innerHTML = "number of objects detected are " + objects.length
        for(i=0; i<objects.length; i++){
            fill(rcolor,gcolor,bcolor);
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill();
            stroke(rcolor,gcolor,bcolor)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function modelloaded() {
    console.log("cocossd model has been loaded correctly")
    status1 = true
}

function gotresults(error, results) {
    if(error) {
        console.log(error)
    }
    else{
        console.log(results);
        objects = results;
    }
}