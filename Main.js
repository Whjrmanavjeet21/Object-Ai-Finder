Status = "";
objects=[];

function setup() {
    canvas = createCanvas(300,300);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
}

function start() {
    object_Detector = ml5.objectDetector('cocossd', modeloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
}

function modeloaded() {
    console.log("Model Loaded");
    Status = true;
}

function draw() {
    image(video, 0,0,300,300);
    if(Status != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById('status').innerHTML = "Status: Object Detected";
            console.log(objects.length);
            fill("#0603d8");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + precent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#0603d8");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text+"found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML + "Not found";
            }
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}