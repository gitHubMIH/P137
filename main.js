objects = [];
video = "";
status = "";
function preload() {
    video = createVideo("video.mp4");
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            document.getElementById("numeroDeObjetos").innerHTML = "Quantidade de Objetos Detectados" + objects.length;
            fill("#Add8e6");
            text(objects[i].label + " " + percent + "%", objects[i].x + 25, objects[i].y + 25);
            noFill();
            stroke("#Add8e6");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            percent = floor(objects[i].confidence * 100);
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : detectando objetos";
}
function modelLoaded() {
    console.log("O modelo foi carregado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}