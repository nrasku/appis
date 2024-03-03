function startScreen() {
    background = new Background({x: 0, y: 0, width: 1000, src: "./backdrop/start-screen.jpg"})

    var frames = 30;
    var timerId = 0;

    timerId = setInterval(updateStartScreen, 1000/frames);
}

function updateStartScreen() {
    clear();
    background.update();
    background.draw();
    ctx.beginPath();
    ctx.font = "38px SpaceMono";
    ctx.fillStyle = "#ff7e33 ";
    ctx.fillText("WORKING TITLE", 140, 40);
    ctx.font = "30px SpaceMono";
    ctx.fillText("START", 240, 160);
    ctx.font = "30px Spacemono";
    ctx.fillText("HOW-TO-PLAY", 190, 200);
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}